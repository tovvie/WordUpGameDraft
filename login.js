// Waits for DOM to be loaded before execution
document.addEventListener('DOMContentLoaded', () => {
  // Get login form element
    const loginForm = document.getElementById('loginForm');
  // Get login error element
    const errorDisplay = document.getElementById('loginError');

  // Event listener for form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents form from submitting normally

      // Get username value from input field
        const username = document.getElementById('username').value.trim();
      // Get password value from input field
        const password = document.getElementById('password').value.trim();

      // Stores username in localstorage
        if (username) {
            localStorage.setItem('currentUser', username);
          // Redirects user to main page
            window.location.href = 'index.html';
        } else {
            errorDisplay.textContent = 'Please enter a username.';
        }
    });
});
