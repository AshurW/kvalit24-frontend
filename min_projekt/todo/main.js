const API_BASE_URL = "http://localhost:8000";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = [];

// document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
document.addEventListener("DOMContentLoaded", getTodos);

function saveTolocalStorage() {
  const json_ = JSON.stringify(todos);
  localStorage.setItem("todos", json_);
}

function loadFromLocalStorage() {
  const todos_json = localStorage.getItem("todos");
  if (todos_json) {
    todos = JSON.parse(todos_json);
    renderTodos();
  }
}

function getTodos() {
  const getTodosURL = `${API_BASE_URL}/todos`;
  fetch(getTodosURL)
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      renderTodos();
    });
}

function renderTodos() {
  todoList.innerHTML = null;
  todos.forEach((todo) => {
    console.log(todo);
    const li = document.createElement("li");
    li.id = todo.id;

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.checked = todo.completed;
    li.appendChild(checkboxInput);

    checkboxInput.addEventListener("change", updateTodoIsDone);

    const span = document.createElement("span");
    span.textContent = todo.text;
    li.appendChild(span);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    li.appendChild(deleteButton);

    deleteButton.addEventListener("click", destroyTodo);

    // li.textContent = todo
    // todoList.insertBefore(li, todoList.firstChild)
    // todoList.prepend(li)
    todoList.appendChild(li);
  });
}

function postTodo(todo) {
  const postTodoURL = `${API_BASE_URL}/todos`;
  fetch(postTodoURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
}

function addTodo(todo) {
  todos.push(todo);
  // saveTolocalStorage()
  postTodo(todo);
  renderTodos();
}

function deleteTodo(id) {
  const deleteTodoURL = `${API_BASE_URL}/todos/${id}`;
  fetch(deleteTodoURL, { method: "DELETE" }).then((response) => {
    if (response.status === 204) {
      getTodos();
      renderTodos();
    }
  });
}

function destroyTodo(e) {
  const li = e.target.parentElement;
  const todoId = Number(li.id);
  deleteTodo(todoId);
  // todos = todos.filter((todo) => todo.id !== todoId);
  // saveTolocalStorage();
  // renderTodos();
}

function putTodo(id, todo) {
  const deleteTodoURL = `${API_BASE_URL}/todos/${id}`;
  fetch(deleteTodoURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((response) => {
    if (response.status === 204) {
      getTodos();
      renderTodos();
    }
  });
}

function updateTodoIsDone(e) {
  const li = e.target.parentElement;
  const todoId = Number(li.id);
  const checked = e.target.checked;
  todos.forEach((todo) => {
    if (todo.id === todoId) {
      todo.completed = checked;
    }
  });
  saveTolocalStorage();
  renderTodos();
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoValue = todoInput.value;
  todoInput.value = null;

  const todo = {
    // id: Date.now(),
    text: todoValue,
    completed: false,
  };
  addTodo(todo);
});
