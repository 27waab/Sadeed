let loginBtn = document.querySelector(".add-noot"),
overlay = document.querySelector(".ovarlay"),
card = document.querySelector(".add-new-note");

loginBtn.onclick = () => {
    overlay.classList.add("show");
    card.classList.add("show");
};
overlay.onclick = () => {
    overlay.classList.remove("show");
    card.classList.remove("show");
}