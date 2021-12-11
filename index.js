// selectores
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// addEventListener
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("change", filterTodo)


// function
function addTodo(e) {


    e.preventDefault();

    // create div that will have the line items of each task
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create line item
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // add todo to localstorage
    saveLocalTodos(todoInput.value)

    // create completion button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // create discard button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // attach de div we just created to the existing ul in the html
    todoList.appendChild(todoDiv)
    // clear
    todoInput.value = "";

}


// delete item
function deleteCheck(e) {

    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo)
        // check if transition of the class css "fall" has ended and then remove the item
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    // check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }

}


function filterTodo(e) {
    const todos = [...todoList.children];

    todos.forEach(function (todo, index) {
        switch (e.target.value) {

            case "all":
                todo.style.display = "flex";

                break;

            case "completed":

                if (todo.classList.contains("completed")) {

                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";

                }
                break;
        }
    })

}


function saveLocalTodos(todo) {
    //check 
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         // create div that will have the line items of each task
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create line item
    const newTodo = document.createElement("li");
    newTodo.innerText = todo
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // create completion button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // create discard button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // attach de div we just created to the existing ul in the html
    todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerHTML
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}