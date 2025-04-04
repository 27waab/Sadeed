document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.querySelector('.todo form');
    const todoInput = document.querySelector('.todo form input[type="text"]');
    const todoSection = document.querySelector('.todo-section');
    const localStorageKey = 'todoItems';

    // دالة لجلب المهام من Local Storage
    function getTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem(localStorageKey);
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // دالة لحفظ المهام في Local Storage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }

    // دالة لإضافة مهمة إلى واجهة المستخدم وحفظها
    function addTask(taskText) {
        const tasks = getTasksFromLocalStorage();
        tasks.push({ text: taskText, finished: false });
        saveTasksToLocalStorage(tasks);
        addTaskToUI(taskText, false);
    }

    // دالة لإضافة مهمة إلى واجهة المستخدم
    function addTaskToUI(taskText, finished) {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        if (finished) {
            newItem.querySelector('.left')?.classList.add('finished');
        }
        newItem.innerHTML = `
            <div class="left ${finished ? 'finished' : ''}">
                <div>
                    <span></span>
                    <h3>${taskText}</h3>
                </div>
                <p>${getCurrentDate()}</p>
            </div>
            <div class="right">
                <i class="fa-solid fa-circle-check ${finished ? 'finished' : ''}"></i>
                <i class="fa-solid fa-trash"></i>
            </div>
        `;
        todoSection.appendChild(newItem);
        addEventListenersToTask(newItem);
    }

    // دالة للحصول على التاريخ الحالي
    function getCurrentDate() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // إضافة مستمعي الأحداث لأزرار الإنهاء والحذف
    function addEventListenersToTask(taskItem) {
        const finishButton = taskItem.querySelector('.fa-circle-check');
        const deleteButton = taskItem.querySelector('.fa-trash');
        const taskElement = taskItem.querySelector('.left');
        const taskTextElement = taskElement.querySelector('h3');

        finishButton.addEventListener('click', function() {
            const taskText = taskTextElement.textContent;
            const tasks = getTasksFromLocalStorage();
            const taskIndex = tasks.findIndex(task => task.text === taskText);
            if (taskIndex !== -1) {
                tasks[taskIndex].finished = !tasks[taskIndex].finished;
                saveTasksToLocalStorage(tasks);
                taskElement.classList.toggle('finished');
                finishButton.classList.toggle('finished'); // يمكنك إضافة كلاس لزر الإنهاء أيضًا
            }
        });

        deleteButton.addEventListener('click', function() {
            const taskText = taskTextElement.textContent;
            let tasks = getTasksFromLocalStorage();
            tasks = tasks.filter(task => task.text !== taskText);
            saveTasksToLocalStorage(tasks);
            taskItem.remove();
        });
    }

    // إضافة مهمة جديدة عند إرسال النموذج
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            todoInput.value = '';
        }
    });

    // تحميل المهام من Local Storage عند تحميل الصفحة
    const initialTasks = getTasksFromLocalStorage();
    initialTasks.forEach(task => {
        addTaskToUI(task.text, task.finished);
    });
});