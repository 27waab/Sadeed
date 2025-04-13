const taskFeild = document.getElementById("task");
const addBtn = document.getElementById("addTask");
const tasks = document.querySelector("ul");
let tasksArr = [];

document.forms[0].onsubmit = (e) => {
    e.preventDefault();
};

const updateSection = () => {
    tasks.innerHTML = "";
    tasksArr.forEach((task, index) => {
        const li = document.createElement("li");
        const pragraph = document.createElement("p");
        const button = document.createElement("button");
        pragraph.textContent = task;
        button.textContent = "حذف";
        button.dataset.index = index;
        li.appendChild(pragraph);
        li.appendChild(button);
        tasks.appendChild(li);
    });
    saveTasks();
};

const updateArr = (text) => {
    const task = text.value.split(" ").filter(Boolean);
    if (task.length > 0) {
        let newTask = task.join(" ");
        tasksArr.push(newTask);
        updateSection();
    }
    taskFeild.value = "";
};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
};

addBtn.addEventListener("click", () => updateArr(taskFeild));
tasks.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const index = event.target.dataset.index;
        tasksArr.splice(index, 1);
        updateSection();
    }
});

const loadTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasksArr = JSON.parse(storedTasks);
        updateSection();
    }
};

loadTasks();