// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const body = document.body;
    
    if (isLoggedIn) {
        body.classList.add('logged-in');
    } else {
        body.classList.remove('logged-in');
    }
}

// Handle sign out
function handleSignOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = '../index.html';
}

// Initialize session management
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    
    // Add event listeners for sign out
    const signOutLinks = document.querySelectorAll('.sign-out-link');
    signOutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleSignOut();
        });
    });
});

// Export functions for use in other scripts
window.sessionManager = {
    checkLoginStatus,
    handleSignOut
}; 