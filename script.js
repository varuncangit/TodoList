// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const taskList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.addEventListener('input', () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) { //if the user value isn't only spaces
        addButton.classList.add("active"); //active the add button
    } else {
        addButton.classList.remove("active"); //unactive the add button
    }
});

showTasks(); //calling showTask function

addButton.onclick = () => { //when user click on plus icon button
    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("TodoListItem"); //getting localstorage
    if (getLocalStorageData == null) { //if localstorage has no data
        listArray = []; //create a blank array
    } else {
        listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    }
    listArray.push({task:userEnteredValue, checked:false}); //pushing or adding new value in array
    localStorage.setItem("TodoListItem", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addButton.classList.remove("active"); //unactive the add button once the task added
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("TodoListItem");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const taskLeftNumb = document.querySelector(".taskLeft");
    taskLeftNumb.textContent = listArray.length; //passing the array length in pendingtask
    if (listArray.length > 0) { //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li><input type="checkbox" id="task-${index}" ${element.checked ? 'checked' : ''} onchange="toggleTask(${index})"><label for="task-${index}">${element.task}</label><span class="icon" onclick="deleteTask(${index})"><i class="fa-regular fa-circle-xmark"></i></span></li>`;
    });
    taskList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

// toggle task function
function toggleTask(index) {
    let getLocalStorageData = localStorage.getItem("TodoListItem");
    listArray = JSON.parse(getLocalStorageData);
    listArray[index].checked = !listArray[index].checked;
    localStorage.setItem("TodoListItem", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}

// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("TodoListItem");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("TodoListItem", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArray = []; //empty the array
    localStorage.setItem("TodoListItem", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
}