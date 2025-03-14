let loginBtn = document.querySelector(".add"),
overlay = document.querySelector(".ovarlay"),
card = document.querySelector(".add-section");

loginBtn.onclick = () => {
    overlay.classList.add("show");
    card.classList.add("show");
};
overlay.onclick = () => {
    overlay.classList.remove("show");
    card.classList.remove("show");
}