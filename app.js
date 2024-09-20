
// Define UI Vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector("#clear-btn");

loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add Task Event
    form.addEventListener("submit", addTask);

    // Clear Task Event
    clearBtn.addEventListener("click", clearTasks);

    // Remove Task
    taskList.addEventListener("click", removeTask);

    // Edit Task
    taskList.addEventListener("click", editTask);
}

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        createTaskElement(task);
    });
}

function addTask(e) {
    e.preventDefault();

    if (taskInput.value === "") {
        alert("Please fill the field");
    } else {
        createTaskElement(taskInput.value);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = "";
    }
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.innerHTML = `
        <span>${task}</span>
        <a class="edit-item secondary-content"><i class="fa fa-edit"></i></a>
        <a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>
    `;
    taskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// edit task

function editTask(e) {
    if (e.target.parentElement.classList.contains("edit-item")) {
        const taskItem = e.target.parentElement.parentElement;
        const taskText = taskItem.querySelector("span").textContent;
        taskItem.innerHTML = `
            <input type="text" class="edit-input" value="${taskText}">
            <a class="save-item secondary-content"><i class="fa fa-check"></i></a>
            <a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>
        `;
    } else if (e.target.parentElement.classList.contains("save-item")) {
        const taskItem = e.target.parentElement.parentElement;
        const newTaskText = taskItem.querySelector(".edit-input").value;
        taskItem.innerHTML = `
            <span>${newTaskText}</span>
            <a class="edit-item secondary-content"><i class="fa fa-edit"></i></a>
            <a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>
        `;
        updateTaskInLocalStorage(taskItem, newTaskText);
    }
}

function updateTaskInLocalStorage(taskItem, newTaskText) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent.trim() === task) {
            tasks[index] = newTaskText;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}




function removeTaskFromLocalStorage(taskElement){

    // console.log();
    
    let tasks;

    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(taskElement.innerText === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));


}

function clearTask(){
    taskList.innerHTML = "";
    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
    localStorage.removeItem("tasks");
}


const arr = [1,2,3];


// get, set, remove, clear

// localStorage.setItem("test", "hello");

// console.log(localStorage.getItem("test"));
// localStorage.removeItem("test");


// console.log(localStorage.getItem("test"));

// localStorage.setItem("arr", arr);


// console.log(arr);

// let arrToString = JSON.stringify(arr);

// console.log(arrToString);
// console.log(typeof arrToString);

// let stringToArr = JSON.parse(arrToString);

// console.log(stringToArr);


// let greet;

// greet.forEach(function(x){
//     console.log(x);
// })