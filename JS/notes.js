const ovarlay = document.querySelector(".overlay");
const btnAddPage = document.getElementById("addBtnInPage");
const addBox = document.getElementById("addForm");
const noteBox = document.getElementById("thenote");
const nameNote = document.getElementById("name");
const noteVal = document.getElementById("txt");
const btnSendData = document.getElementById("sendData");
const thePage = document.querySelector(".notes-content");
let noteArr = localStorage.getItem('myNotes') ? JSON.parse(localStorage.getItem('myNotes')) : [];

const closeAndOpen = (ele) => {
    ele.classList.toggle("show");
    ovarlay.classList.toggle("show");
}

const showDate = (index) => {
    const theNote = noteArr[index];
    noteBox.innerHTML = "";
    const title = document.createElement("h3");
    const content = document.createElement("p");
    title.textContent = theNote.name;
    content.textContent = theNote.note;
    noteBox.appendChild(title);
    noteBox.appendChild(content);
}

const addTheNoteInPage = () => {
    thePage.innerHTML = "";
    noteArr.forEach((note, index) => {
        const li = document.createElement("li");
        const pragraph = document.createElement("p");
        const span = document.createElement("span");
        li.dataset.index = index;
        pragraph.textContent = note.name;
        span.textContent = index + 1;
        li.appendChild(span);
        li.appendChild(pragraph);
        thePage.appendChild(li);
    })
}

const saveNotesToLocalStorage = () => {
    localStorage.setItem('myNotes', JSON.stringify(noteArr));
}

const addNoteToArr = (name, note) => {
    const nameOfNote = name.value;
    const theNote = note.value;
    const objOfNote = {
        name: nameOfNote,
        note: theNote,
    }
    noteArr.push(objOfNote);
    saveNotesToLocalStorage(); // حفظ الملاحظات بعد الإضافة
    closeAndOpen(addBox);
    name.value = "";
    note.value = "";
    addTheNoteInPage();
}

btnAddPage.addEventListener("click", () => closeAndOpen(addBox));
ovarlay.addEventListener("click", () => closeAndOpen(addBox));
btnSendData.addEventListener("click", () => addNoteToArr(nameNote, noteVal));
thePage.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const index = e.target.dataset.index;
        closeAndOpen(noteBox);
        if (noteBox.classList.contains("show")) {
            ovarlay.addEventListener("click", () => {
                ovarlay.classList.remove("show");
                noteBox.classList.remove("show");
                addBox.classList.remove("show");
            });
        }
        showDate(index);
    }
})

// عرض الملاحظات المحفوظة عند تحميل الصفحة
addTheNoteInPage();