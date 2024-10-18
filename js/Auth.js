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

// Function to collect device info
function getDeviceInfo() {
    // Get the current date and time
    const currentDate = new Date();

    // Convert the current date and time to IST (Indian Standard Time)
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const istTime = currentDate.toLocaleString('en-IN', options);
    return {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        browser: navigator.appName,
        browserVersion: navigator.appVersion,
        screenWidth: screen.width,
        screenHeight: screen.height,
        lastLogin: istTime, // Store the last login time in IST
        timestamp: new Date().toISOString()
    };
}

// Function to store device info in Firebase database
function storeDeviceInfo(userId) {
    const deviceInfo = getDeviceInfo();
    const db = firebase.database();

    // Generate a unique key for each new login entry
    const newDeviceKey = db.ref('users/' + userId + '/deviceInfo').push().key;

    // Store the device info under this unique key (preserves all records)
    db.ref('users/' + userId + '/deviceInfo/' + newDeviceKey).set(deviceInfo);
}

// Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Store device info
        storeDeviceInfo(user.uid);
    } else {
        // Redirect to login if not logged in
        window.location.href = 'index.html'; // Redirect to login page
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function () {
    Swal.fire({
        title: "Are you sure you want to logout?",
        text: "You will be logged out and redirected to the login page.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
      }).then((result) => {
        if (result.isConfirmed) {
            firebase.auth().signOut().then(() => {
            Swal.fire({
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                icon: "success",
                timer: 1500,  // Auto close after 1.5 seconds
                showConfirmButton: false
            }).then(() => {
                // Redirect to the login page
                window.location.href = 'index.html';
            });
        });
        }
      });
    
});