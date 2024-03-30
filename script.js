document.addEventListener("DOMContentLoaded", function() {
    displayTasks();
  });
  
  function addItem() {
    const itemName = document.getElementById("item-name").value;
    const itemDate = document.getElementById("item-date").value;
    const priority = document.getElementById("priority").value;
  
    if (itemName.trim() === "" || itemDate.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const newItem = {
      name: itemName,
      date: itemDate,
      priority: priority,
      completed: false
    };
    todoList.push(newItem);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  
    displayTasks();
  }
  
  function displayTasks() {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = todoList.filter(item => item.date === today);
    const futureTasks = todoList.filter(item => item.date > today);
    const completedTasks = todoList.filter(item => item.completed);
  
    const todayTasksContainer = document.getElementById("today-tasks");
    const futureTasksContainer = document.getElementById("future-tasks");
    const completedTasksContainer = document.getElementById("completed");
  
    todayTasksContainer.innerHTML = "";
    futureTasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";
  
    todayTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      todayTasksContainer.appendChild(taskElement);
    });
  
    futureTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      taskElement.classList.add("future");
      futureTasksContainer.appendChild(taskElement);
    });
  
    completedTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      taskElement.classList.add("completed");
      completedTasksContainer.appendChild(taskElement);
    });
  }
  
  function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
      <p><strong>Name:</strong> ${task.name}</p>
      <p><strong>Date:</strong> ${task.date}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <button onclick="deleteItem('${task.name}')">Delete</button>
      <button onclick="toggleCompleted('${task.name}')">Toggle Completed</button>
    `;
    return taskElement;
  }
  
  function deleteItem(itemName) {
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList = todoList.filter(item => item.name !== itemName);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTasks();
  }
  
  function toggleCompleted(itemName) {
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.forEach(item => {
      if (item.name === itemName) {
        item.completed = !item.completed;
      }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTasks();
  }
  