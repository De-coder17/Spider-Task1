let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let scheduler = document.querySelector("#scheduler");
const calendar = document.querySelector('#calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const h1 = document.querySelector("#heading1");
const togglebtn = document.querySelector(".toggle");
const tlist = document.querySelector("#todoList")


tlist.style.display = "none"


togglebtn.addEventListener("click" , function(){
    scheduler.style.display = "inline";
    tlist.style.display = "none"
})

function load(){
    const date = new Date();

  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
    
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.querySelector('#monthDisplay').innerText = 
  `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener("click" , function(){
                togglebtn.classList.add("position")
                tlist.style.display = "inline"
                scheduler.style.display = "none";
                h1.style.display = "inline"
                h1.innerText = `Enter the Todo's you want to do on
                 ${daySquare.innerText = i - paddingDays} ${date.toLocaleDateString('en-us', { month: 'long' })} ${year} `
            })
        } else{
            daySquare.classList.add("padding")
        }

        calendar.appendChild(daySquare);
    }

}

function initButtons(){
    document.querySelector("#nextButton").addEventListener("click" , function(){
        nav += 1; 
        load();
    })

    document.querySelector("#backButton").addEventListener("click" , function(){
        nav -= 1; 
        load();
    })
    
}



initButtons();
load();


//
// selecting elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// adding event LIsteners
document.addEventListener("DOMContentLoaded" , getTodos);

todoButton.addEventListener("click" , addTodo)

todoList.addEventListener("click" , deleteTodo)


// functions used

function addTodo(evt){
    // preventing form from submitting
    evt.preventDefault();
    // todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creating Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")

    todoDiv.appendChild(newTodo);
    // adding to local storage

    saveTodos(todoInput.value);

    // Delete todo button
    const dltButton = document.createElement("button");
    dltButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    dltButton.classList.add("trash-btn");
    todoDiv.appendChild(dltButton);

    //Appen to list
    todoList.appendChild(todoDiv);

    //clearing inputs
    todoInput.value = "";


}

function deleteTodo(evt){
    const item = evt.target;

    //deleteing todos
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("falldown");
        removeTodos(todo);
        todo.remove();
    }

}

function saveTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
          // todo Div
        const todoDiv = document.createElement("div");
         todoDiv.classList.add("todo");

    //creating Li
         const newTodo = document.createElement("li");
         newTodo.innerText = todo;
         newTodo.classList.add("todo-item")

         todoDiv.appendChild(newTodo);
  

    // Delete todo button
          const dltButton = document.createElement("button");
          dltButton.innerHTML = "<i class = 'fas fa-trash'></i>";
          dltButton.classList.add("trash-btn");
          todoDiv.appendChild(dltButton);

    //Appen to list
          todoList.appendChild(todoDiv);
 
    })
}

function removeTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));

}

