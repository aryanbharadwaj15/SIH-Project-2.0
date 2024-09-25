// Firebase Configuration (Make sure to initialize Firebase in your main HTML file)

// Function to select role
function selectRole(role) {
    document.getElementById('admin').classList.remove('selected');
    document.getElementById('user').classList.remove('selected');
    document.getElementById(role).classList.add('selected');
}

// Function to close login
function closeLogin() {
    window.location.href = "home.html";
}

// Submit Button with validation
function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Clear any previous error messages
    clearErrorMessages();

    // Check if both email and password fields are filled
    if (email && password) {
        // Firebase Authentication: Sign in the user with email and password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Successfully signed in
                showThankYouModal("Successfully logged in!"); // Show success message
                // Redirect after a delay
                setTimeout(() => {
                    window.location.href = "home.html"; // Redirect to home page after modal
                }, 3000);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;

                // Show error message below the email and password fields
                if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                    displayFieldError("You have entered wrong email or password. Please try again.");
                } else {
                    displayFieldError("You have entered wrong email or password. Please try again.");
                }
            });
    } else {
        document.getElementById('loginForm').reportValidity(); // Show default browser validation messages
    }
}

// Function to clear previous error messages
function clearErrorMessages() {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.remove(); // Remove previous error message if it exists
    }
}

// Function to display error message below the email and password fields
function displayFieldError(message) {
    const form = document.getElementById('loginForm');
    const errorMessageElement = document.createElement('p');
    errorMessageElement.id = 'error-message';
    errorMessageElement.style.color = 'red'; // You can style this to match your form design
    errorMessageElement.style.fontSize = '0.9em';
    errorMessageElement.textContent = message;

    // Insert the error message below the password field
    const passwordField = document.getElementById('password');
    passwordField.parentNode.insertBefore(errorMessageElement, passwordField.nextSibling);
}

// Function to show success modal
function showThankYouModal(message) {
    const modal = document.getElementById("thankYouModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message; // Set the message in the modal
    modal.style.display = "block"; // Show the modal

    // Close the modal after 3 seconds for success
    setTimeout(() => {
        modal.style.display = "none"; // Close the modal
    }, 3000);
}


// Login Function with Realtime Database
function logIn(emailInput, passwordInput) {
    const hashedPasswordInput = hashPassword(passwordInput); // Hash the entered password for comparison

    // Retrieve users from the Realtime Database
    firebase.database().ref('users').once('value', function (snapshot) {
        let authenticated = false;

        snapshot.forEach(function (childSnapshot) {
            const userData = childSnapshot.val();

            if (userData.email === emailInput && userData.password === hashedPasswordInput) {
                authenticated = true;
                console.log("Login successful!");
                // Redirect to the dashboard or perform further actions
            }
        });

        if (!authenticated) {
            console.log("Login failed! Incorrect email or password.");
            showErrorModal("Incorrect email or password! Please try again.");
        }
    });
}