// Function to toggle the visibility of the login options
function toggleLogin() {
    const loginOptions = document.getElementById('loginOptions');
    const navigationOptions = document.getElementById("navigationOptions");

    if (loginOptions.style.display === 'flex') {
        loginOptions.style.display = 'none'; // Hide options if they're currently displayed
    } else {
        loginOptions.style.display = 'flex'; // Show options
        navigationOptions.style.display = 'none'; // Hide navigation options
    }
}

// Function to handle login validation and navigation
document.getElementById("loginButton").onclick = function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
    const loginOptions = document.getElementById("loginOptions");
    const navigationOptions = document.getElementById("navigationOptions");

    errorMessage.style.display = "none"; // Hide error message initially

    // Validate inputs
    if (username.length < 3) {
        errorMessage.innerText = "Username must be at least 3 characters long.";
        errorMessage.style.display = "block";
    } else if (password.length < 6) {
        errorMessage.innerText = "Password must be at least 6 characters long.";
        errorMessage.style.display = "block";
    } else {
        // If validation passes, show navigation options
        loginOptions.style.display = "none"; // Hide login options
        navigationOptions.style.display = "flex"; // Show navigation options
    }
};

// Function to go back to the initial state
function goBack() {
    const loginOptions = document.getElementById('loginOptions');
    const navigationOptions = document.getElementById("navigationOptions");

    // Hide navigation options and show login options again
    navigationOptions.style.display = 'none'; // Hide the options
    loginOptions.style.display = 'flex'; // Show login options
};

// Add click event listener to the profile image container
document.querySelector('.profile-image-container').onclick = toggleLogin;
