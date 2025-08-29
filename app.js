
// Part 1: Variables, Data Types, Conditionals
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Array to store tasks
let appTitle = "📝 To-Do List"; // String variable
let maxTasks = 20; // Number variable

// Example conditional: limit number of tasks
function canAddTask() {
  return tasks.length < maxTasks;
}


// Part 2: Functions (Reusable blocks)
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Part 3: Loops (forEach for rendering, for for stats)
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  // Loop: forEach to render each task
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span 
        onclick="toggleComplete(${index})"
        style="cursor:pointer; text-decoration: ${task.completed ? 'line-through' : 'none'}"
      >
        ${task.text}
      </span>
      <button class="delete" onclick="deleteTask(${index})">X</button>
    `;
    taskList.appendChild(li);
  });

  // Loop: for to count completed tasks
  let completedCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) completedCount++;
  }
  // DOM interaction: update stats
  let stats = document.getElementById("stats");
  if (!stats) {
    stats = document.createElement("div");
    stats.id = "stats";
    stats.style.marginTop = "1rem";
    document.querySelector(".container").appendChild(stats);
  }
  stats.innerHTML = `<strong>Total Tasks:</strong> ${tasks.length} | <strong>Completed:</strong> ${completedCount}`;
}


// Part 2: Function with conditionals
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  // Conditional: check for empty and max tasks
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  if (!canAddTask()) {
    alert("Maximum number of tasks reached.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}


// Part 2: Function for deleting
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}


// Part 2: Function for toggling completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}


// Part 4: DOM Interactions
document.addEventListener("DOMContentLoaded", () => {
  // DOM: Set app title
  document.querySelector("h1").textContent = appTitle;
  // Initial render
  renderTasks();
  // DOM: Focus input on load
  document.getElementById("taskInput").focus();
});
