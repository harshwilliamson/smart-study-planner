function getTasks(){
return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks){
localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(){
let name = document.getElementById('taskName').value;
let date = document.getElementById('taskDate').value;
let priority = document.getElementById('priority').value;

if(!name || !date){
alert("Please fill all fields");
return;
}

let tasks = getTasks();
tasks.push({name, date, priority, done:false});
saveTasks(tasks);
renderTasks();
}

function renderTasks(){
let tasks = getTasks();
let list = document.getElementById('taskList');
if(!list) return;

if(tasks.length === 0){
list.innerHTML = "<p>No tasks added yet.</p>";
return;
}

list.innerHTML = tasks.map((t,i)=>`
<div class="card">
<b>${t.name}</b> (${t.priority}) - ${t.date}
<br>
<button onclick="toggleTask(${i})">✔ Done</button>
<button onclick="deleteTask(${i})">🗑 Delete</button>
</div>
`).join('');
}

function toggleTask(i){
let tasks = getTasks();
tasks[i].done = !tasks[i].done;
saveTasks(tasks);
renderTasks();
}

function deleteTask(i){
let tasks = getTasks();
tasks.splice(i,1);
saveTasks(tasks);
renderTasks();
}

function showDetailedProgress(){
let tasks = getTasks();
let today = new Date().toISOString().split('T')[0];

let completed = tasks.filter(t=>t.done).length;
let pending = tasks.filter(t=>!t.done && t.date <= today).length;
let future = tasks.filter(t=>t.date > today).length;

document.getElementById('summary').innerText =
`Total Tasks: ${tasks.length}`;

document.getElementById('completed').innerText =
`Completed: ${completed}`;

document.getElementById('pending').innerText =
`Pending: ${pending}`;

document.getElementById('future').innerText =
`Future Tasks: ${future}`;
}

window.onload = renderTasks;

function toggleNotes() {
  const panel = document.getElementById("notesPanel");
  panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}