document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.querySelector(".priority .container .add");
    const overlay = document.querySelector(".ovarlay");
    const addSection = document.querySelector(".add-section");
    const taskNameInput = document.getElementById("name");
    const desireInput = document.getElementById("r");
    const abilityInput = document.getElementById("q");
    const timeInput = document.getElementById("w");
    const addTaskButton = addSection.querySelector("button");
    const priorityContainer = document.querySelector(".priority .container");
    let tasks = [];

    // إظهار قسم إضافة المهمة
    addBtn.onclick = () => {
        overlay.classList.add("show");
        addSection.classList.add("show");
    };

    // إخفاء قسم إضافة المهمة عند النقر على الـ overlay
    overlay.onclick = () => {
        overlay.classList.remove("show");
        addSection.classList.remove("show");
    };

// إضافة مهمة جديدة
addTaskButton.onclick = () => {
    const taskName = taskNameInput.value.trim();
    const desire = parseInt(desireInput.value);
    const ability = parseInt(abilityInput.value);
    const time = parseInt(timeInput.value);
    if (taskName && !isNaN(desire) && !isNaN(ability) && !isNaN(time) &&
        desire >= 1 && desire <= 5 && ability >= 1 && ability <= 5 && time >= 1 && time <= 5) {
        const task = {
            name: taskName,
            desire: desire,
            ability: ability,
            time: time,
            totalScore: desire + ability + time,
        };
        tasks.push(task);
        renderTasks();
        // مسح الحقول بعد الإضافة
        taskNameInput.value = "";
        desireInput.value = "";
        abilityInput.value = "";
        timeInput.value = "";
        overlay.classList.remove("show");
        addSection.classList.remove("show");
        } else {
            alert("الرجاء إدخال اسم المهمة وتقييم الرغبة والقدرة والوقت بشكل صحيح (من 1 إلى 5).");
        }
    };
    // ترتيب المهام حسب المجموع الكلي
    function sortTasks() {
        tasks.sort((a, b) => b.totalScore - a.totalScore);
    }
    // عرض المهام في الصفحة
    function renderTasks() {
        // إنشاء الحاوية إذا لم تكن موجودة
        let tasksContainer = priorityContainer.querySelector(".tasks-container");
        if (!tasksContainer) {
            tasksContainer = document.createElement("div");
            tasksContainer.classList.add("tasks-container");
            priorityContainer.appendChild(tasksContainer);
        }
        tasksContainer.innerHTML = ""; // مسح المهام المعروضة سابقًا
        sortTasks();
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("item");
            taskDiv.innerHTML = `
                <span>${index + 1}- ${task.name}</span>
                <div>
                    <span>الرغبة: ${task.desire}/5</span>
                    <span>القدرة: ${task.ability}/5</span>
                    <span>الوقت: ${task.time}/5</span>
                    <span>المجموع: ${task.totalScore}</span>
                </div>
            `;
            tasksContainer.appendChild(taskDiv);
        });
    }
    // إخفاء قسم إضافة المهمة عند التحميل
    // addSection.style.display = 'none';
});
