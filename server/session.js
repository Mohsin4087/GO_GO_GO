// Check login state and update navigation
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-links');
    const mobileMenus = document.querySelectorAll('.mobile-menu ul');

    if (isLoggedIn) {
        body.classList.add('logged-in');
        
        // Update desktop navigation
        navLinks.forEach(nav => {
            const signInLink = nav.querySelector('.sign-in-link');
            const dashboardLink = nav.querySelector('.dashboard-link');
            const signOutLink = nav.querySelector('.sign-out-link');
            
            if (signInLink) signInLink.style.display = 'none';
            if (dashboardLink) dashboardLink.style.display = 'block';
            if (signOutLink) signOutLink.style.display = 'block';
        });

        // Update mobile navigation
        mobileMenus.forEach(menu => {
            const signInLink = menu.querySelector('.sign-in-link');
            const dashboardLink = menu.querySelector('.dashboard-link');
            const signOutLink = menu.querySelector('.sign-out-link');
            
            if (signInLink) signInLink.style.display = 'none';
            if (dashboardLink) dashboardLink.style.display = 'block';
            if (signOutLink) signOutLink.style.display = 'block';
        });
    }
}

// Handle sign out
function signOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

// Initialize session management
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();

    // Add sign out functionality
    const signOutLinks = document.querySelectorAll('.sign-out-link');
    signOutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            signOut();
        });
    });
}); 