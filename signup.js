// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKbuxeOpXny1OtZlfLFL9oiedL-3GTkT8",
    authDomain: "web-testing-49421.firebaseapp.com",
    projectId: "web-testing-49421",
    storageBucket: "web-testing-49421.appspot.com",
    messagingSenderId: "27655605002",
    appId: "1:27655605002:web:bfcad1256a91d9ff4d08f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Capture the slidePage and other buttons
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const form = document.querySelector("form");

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const passwordStrength = document.getElementById("passwordStrength");

// Progress bar selectors
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

// Function to update progress bar
function updateProgress() {
    if (current - 1 < bullet.length) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
    }
    current += 1; // Increment the current step
}

// Function to revert progress bar
function revertProgress() {
    if (current > 1) { // Ensure not to go below step 1
        bullet[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        progressText[current - 2].classList.remove("active");
        current -= 1; // Decrement the current step
    }
}

// Next Button Validations for the first page
nextBtnFirst.addEventListener("click", validateFirstPage);
nextBtnSec.addEventListener("click", validateSecondPage);
nextBtnThird.addEventListener("click", validateThirdPage);
if (form) {
    form.addEventListener("submit", submitForm);
}

// First page validation
function validateFirstPage(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    if (!firstName.value || !lastName.value) {
        firstName.setCustomValidity(firstName.value ? "" : "Please fill out this field.");
        lastName.setCustomValidity(lastName.value ? "" : "Please fill out this field.");
        form.reportValidity();
    } else {
        firstName.setCustomValidity("");
        lastName.setCustomValidity("");
        slidePage.style.marginLeft = "-25%"; // Move to next page
        updateProgress(); // Update progress
    }
}

// Second page validation
function validateSecondPage(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    // Country code selection
    const countryCode = document.getElementById("countryCode").value;

    // Email regex pattern for validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Phone number regex pattern for validation
    const phonePattern = /^[0-9]{7,15}$/; // 7-15 digits for a valid phone number

    let isValid = true;

    // Email validation
    if (!emailPattern.test(email)) {
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Phone number validation
    if (!phonePattern.test(phoneNumber)) {
        phoneError.style.display = "block";
        isValid = false;
    } else {
        phoneError.style.display = "none";
    }

    // If both email and phone are valid, proceed to the next step
    if (isValid) {
        slidePage.style.marginLeft = "-50%";
        updateProgress();
    }
}

// Third page validation
function validateThirdPage(event) {
    event.preventDefault();
    const dob = document.getElementById("dob");
    const gender = document.querySelector("select");

    const dobPattern = /^\d{4}-\d{2}-\d{2}$/; // Ensure it’s in yyyy-mm-dd format

    if (!dobPattern.test(dob.value)) {
        dob.setCustomValidity("Please enter a valid date in yyyy-mm-dd format.");
        form.reportValidity();
    } else if (!gender.value) {
        gender.setCustomValidity("Please select a gender.");
        form.reportValidity();
    } else {
        dob.setCustomValidity("");
        gender.setCustomValidity("");
        slidePage.style.marginLeft = "-75%";
        updateProgress();
    }
}

// Submit Button with validation
function submitForm(event) {
    event.preventDefault();
    if (form.checkValidity()) {
        registerUser(); // Call the function to register the user
    } else {
        form.reportValidity(); // Show all validation errors if any
    }
}

// Function to register the user and store data
function registerUser() {
    // Get user details
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value; // Date of Birth

    // Create user with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            // Save additional user data in Realtime Database
            set(ref(database, 'users/' + user.uid), {
                fullName: firstName + " " + lastName,
                phoneNumber: phoneNumber,
                email: email,
                password: password,
                dateOfBirth: dob,
                createdAt: new Date().toISOString()
            })
            .then(() => {
                alert("User signed up and data stored in the database!");
                showThankYouModal(); // Show the thank you modal
            })
            .catch((error) => {
                console.error("Error storing data in database: ", error);
                alert("Error storing user data: " + error.message);
            });
        })
        .catch((error) => {
            console.error("Error signing up: ", error);
            alert("Signup failed: " + error.message);
        });
}

// Function to show the Thank You modal
function showThankYouModal() {
    const modal = document.getElementById("thankYouModal");
    modal.style.display = "block"; // Show the modal

    // After 3 seconds, close the modal and redirect
    setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "login.html"; // Redirect to login page
    }, 3000);
}

// Previous Buttons Functionality
prevBtnSec.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "0%";
    revertProgress();
});

prevBtnThird.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    revertProgress();
});

prevBtnFourth.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    revertProgress();
});

// Password Visibility Toggle
togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

// Password Strength Checker
passwordInput.addEventListener("input", function () {
    const value = passwordInput.value;
    const strongPattern = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/; // At least one uppercase, one lowercase, one number, one special character, and 8+ characters
    const mediumPattern = /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least one uppercase, one lowercase, one number, and 8+ characters

    if (strongPattern.test(value)) {
        passwordStrength.textContent = "Strong";
        passwordStrength.style.color = "green";
    } else if (mediumPattern.test(value)) {
        passwordStrength.textContent = "Medium";
        passwordStrength.style.color = "orange";
    } else {
        passwordStrength.textContent = "Weak";
        passwordStrength.style.color = "red";
    }
});
// Datepicker for Date of Birth
$(function () {
    $("#dob").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2024"
    });
});
// Listen for Enter key press on the entire document
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior

        // Trigger the corresponding Next button based on current step
        if (current === 1) {
            nextBtnFirst.click();
        } else if (current === 2) {
            nextBtnSec.click();
        } else if (current === 3) {
            nextBtnThird.click();
        } else if (current === 4) {
            submitBtn.click();
        }
    }
});
