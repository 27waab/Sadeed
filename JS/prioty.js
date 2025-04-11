const ovarlay = document.querySelector(".overlay");
const boxOfAdd = document.getElementById("addNewTaskBox");
const addBtnTaskInPage = document.getElementById("add");
const nameOfTask = document.getElementById("name");
const r = document.getElementById("r");
const q = document.getElementById("q");
const t = document.getElementById("t");
const addBtnTaskInBox = document.getElementById("addTask");
const sectionOfTasks = document.querySelector(".task-content");
const clearBtn = document.getElementById("clear");
let taskArr = [];

addBtnTaskInPage.onclick = () => {
    ovarlay.classList.add("show");
    boxOfAdd.classList.add("show");
}
ovarlay.onclick = () => {
    ovarlay.classList.remove("show");
    boxOfAdd.classList.remove("show");
}

const addElement = () => {
    sectionOfTasks.innerHTML = "";
    nameOfTask.value = "";
    r.value = "";
    q.value = "";
    t.value = "";
    for (let i = 0; i < taskArr.length; i++) {
        const li = document.createElement("li");
        const sideRite = document.createElement("div");
        const span = document.createElement("span");
        const task = document.createElement("h5");
        const pragraph = document.createElement("p");
        span.textContent = `${i + 1}-`;
        task.textContent = `${taskArr[i].name}`;
        pragraph.textContent = `${taskArr[i].counter} نقطة`;
        sideRite.appendChild(span);
        sideRite.appendChild(task);
        li.appendChild(sideRite);
        li.appendChild(pragraph);
        sectionOfTasks.appendChild(li);
    }
}

const addObj = (name, rin, qin, tin) => {
    if (nameOfTask.value !== "" && r.value !== "" && q.value !== "" && t.value !== "") {
        if (+r.value <= 5 && +q.value <= 5 && +t.value <= 5) {
            const taskName = name.value;
            const rNum = rin.value;
            const qNum = qin.value;
            const tNum = tin.value;
            const obj = {
                name: taskName,
                counter: +rNum + +qNum + +tNum,
            }
            taskArr.push(obj);
            taskArr.sort((a, b) => b.counter - a.counter);
            addElement();
            ovarlay.classList.remove("show");
            boxOfAdd.classList.remove("show");
        } else {
            alert("يبدو أنك أدخلت رقماََ كبيراََ، الحد هو 5 فقط");
        }
    } else {
        alert("لقد نسيت حقلاََ فارغ!");
    }
}

addBtnTaskInBox.addEventListener("click", () => addObj(nameOfTask, r, q, t));
clearBtn.addEventListener("click", () => {
    taskArr = [];
    addElement();
});
