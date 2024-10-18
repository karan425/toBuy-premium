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
    return {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        browser: navigator.appName,
        browserVersion: navigator.appVersion,
        screenWidth: screen.width,
        screenHeight: screen.height
    };
}

// Function to store device info in Firebase database
function storeDeviceInfo(userId) {
    const deviceInfo = getDeviceInfo();
    const db = firebase.database();

    db.ref('users/' + userId + '/deviceInfo').set({
        platform: deviceInfo.platform,
        userAgent: deviceInfo.userAgent,
        browser: deviceInfo.browser,
        browserVersion: deviceInfo.browserVersion,
        screenWidth: deviceInfo.screenWidth,
        screenHeight: deviceInfo.screenHeight,
        lastLogin: new Date().toISOString()
    });
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