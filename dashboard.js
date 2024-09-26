// Initialize Firebase App in your main HTML file if not done already
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";





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

document.getElementById('menu-toggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
});

document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');

    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Chart.js setup
const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Performance',
            data: [12, 19, 3, 5, 2],
            borderColor: '#007bff',
            borderWidth: 2,
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function logoutUser() {
    signOut(auth).then(() => {
        // Sign-out successful, redirect to login page
        window.location.href = 'login.html';
    }).catch((error) => {
        // Handle errors here
        console.error("Logout Error: ", error);
    });
}

// Attach the logout function to the logout button
document.querySelector('.logout-btn').addEventListener('click', logoutUser);
// Monitor user authentication state
onAuthStateChanged(auth, (user) => {
    const dashboardContainer = document.querySelector('.dashboard-container');
    const welcomeText = document.querySelector('.user-info span');

    if (user) {
        // User is signed in, show dashboard and update welcome text
        dashboardContainer.style.display = 'block';  // Show dashboard
        welcomeText.textContent = `Welcome, ${user.displayName || user.email.split('@')[0]}`;  // Use display name or email
    } else {
        // No user is signed in, hide dashboard
        dashboardContainer.style.display = 'none';  // Hide dashboard
        window.location.href = 'login.html';  // Redirect to login page if not logged in
    }
});
