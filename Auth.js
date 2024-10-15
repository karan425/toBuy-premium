 // Your Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAWc_p6H4MKH58b7IYMNr3ZrQ1xo3TSJYg",
    authDomain: "my-app-e3635.firebaseapp.com",
    databaseURL: "https://my-app-e3635-default-rtdb.firebaseio.com",
    projectId: "my-app-e3635",
    storageBucket: "my-app-e3635.appspot.com",
    messagingSenderId: "20105586925",
    appId: "1:20105586925:web:cb92562c14c943083084e4",
    measurementId: "G-9JKN4CLKWC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // document.getElementById('user-email').textContent = `Welcome, ${user.email}`;
    } else {
        // Redirect to login if not logged in
        window.location.href = 'index.html'; // Redirect to login page
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function () {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html'; // Redirect to login page
    });
});