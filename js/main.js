let loginBtn = document.querySelector(".login");
let overlay = document.querySelector(".ovarlay");
let card = document.querySelector(".login-card");
let nameInput = document.getElementById("name");
let submitButton = card.querySelector(".content a button");

loginBtn.onclick = () => {
    overlay.classList.add("show");
    card.classList.add("show");
};

overlay.onclick = () => {
    overlay.classList.remove("show");
    card.classList.remove("show");
};

submitButton.onclick = (event) => {
    event.preventDefault();
    const username = nameInput.value.trim();
    if (username) {
        localStorage.setItem("username", username);
        window.location.href = "home.html";
        nameInput.value = "";
    } else {
        alert("الرجاء إدخال اسم المستخدم.");
    }
};
