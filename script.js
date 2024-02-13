const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const taskList = document.querySelector(".todoList");
const deleteButton = document.querySelector(".footer button");

inputBox.addEventListener('input', () => {
    let enterValue = inputBox.value;
    if (enterValue.trim() != 0) {
        addButton.classList.add("active");
    } else {
        addButton.classList.remove("active");
    }
});

showTasks(); 

addButton.onclick = () => { 
    let enterValue = inputBox.value; 
    let getLocalStorageData = localStorage.getItem("TodoListItem"); 
    if (getLocalStorageData == null) { 
        listArray = []; 
    } else {
        listArray = JSON.parse(getLocalStorageData); 
    }
    listArray.push({task:enterValue, checked:false}); 
    localStorage.setItem("TodoListItem", JSON.stringify(listArray)); 
    showTasks(); 
    addButton.classList.remove("active"); 
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("TodoListItem");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const taskLeftNumb = document.querySelector(".taskLeft");
    taskLeftNumb.textContent = listArray.length; 
    if (listArray.length > 0) { 
        deleteButton.classList.add("active"); 
    } else {
        deleteButton.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li><input type="checkbox" id="task-${index}" ${element.checked ? 'checked' : ''} onchange="toggleTask(${index})"><label for="task-${index}">${element.task}</label><span class="icon" onclick="deleteTask(${index})"><i class="fa-regular fa-circle-xmark"></i></span></li>`;
    });
    taskList.innerHTML = newLiTag; 
    inputBox.value = ""; 
}

function toggleTask(index) {
    let getLocalStorageData = localStorage.getItem("TodoListItem");
    listArray = JSON.parse(getLocalStorageData);
    listArray[index].checked = !listArray[index].checked;
    localStorage.setItem("TodoListItem", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("TodoListItem");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); 
    localStorage.setItem("TodoListItem", JSON.stringify(listArray));
    showTasks(); 
}

deleteButton.onclick = () => {
    listArray = []; 
    localStorage.setItem("TodoListItem", JSON.stringify(listArray)); 
    showTasks(); 
}
