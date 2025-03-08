let loginBtn = document.querySelector(".login"),
overlay = document.querySelector(".ovarlay"),
card = document.querySelector(".login-card");

loginBtn.onclick = () => {
    overlay.classList.add("show");
    card.classList.add("show");
};
overlay.onclick = () => {
    overlay.classList.remove("show");
    card.classList.remove("show");
}