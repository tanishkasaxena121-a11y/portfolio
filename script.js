const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button class="complete">
                ✓
                </button>

                <button class="edit">
                Edit
                </button>

                <button class="delete">
                Delete
                </button>

            </div>
        `;

        li.querySelector(".complete").onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        li.querySelector(".edit").onclick = () => {
            const newText = prompt("Edit Task", task.text);

            if (newText && newText.trim() !== "") {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        };

        li.querySelector(".delete").onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        taskList.appendChild(li);

    });
}

addBtn.onclick = () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();

};

filterBtns.forEach(btn => {

    btn.onclick = () => {

        filterBtns.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTasks();

    };

});

renderTasks();