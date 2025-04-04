document.addEventListener('DOMContentLoaded', function() {
    const usernameSpan = document.querySelector('.welcome h1 span');
    const storedUsername = localStorage.getItem('username');

    if (usernameSpan && storedUsername) {
        usernameSpan.textContent = storedUsername;
    }
});