const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const completeSound = document.getElementById("completeSound");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const quotes = [
  "✨ You can do it!",
  "🌻 One task at a time.",
  "🌈 Progress, not perfection!",
  "🌼 Small steps matter!",
  "☀️ Keep going, you’re doing great!"
];

document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks
    .filter(task => {
      if (filter === "all") return true;
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      const content = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = task.text;
      span.onclick = () => toggleTask(index);

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerText = task.due ? `Due: ${task.due}` : "";

      content.appendChild(span);
      content.appendChild(meta);

      const btns = document.createElement("div");
      btns.className = "actions";

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "✏️";
      editBtn.onclick = () => editTask(index);

      const delBtn = document.createElement("button");
      delBtn.innerHTML = "🗑️";
      delBtn.onclick = () => deleteTask(index);

      btns.appendChild(editBtn);
      btns.appendChild(delBtn);

      li.appendChild(content);
      li.appendChild(btns);
      taskList.appendChild(li);
    });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Type something cute!");
  const due = dueDate.value;
  tasks.push({ text, due, completed: false });
  taskInput.value = "";
  dueDate.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) completeSound.play();
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this adorable task? 😢")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

renderTasks();
