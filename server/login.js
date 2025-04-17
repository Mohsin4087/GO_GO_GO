document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-message');
  
  // Check if user is already logged in
  if (localStorage.getItem('isLoggedIn') === 'true') {
      window.location.href = 'dashboard.html';
      return;
  }
  
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Simple validation
      if (!email || !password) {
          showMessage('Please fill in all fields', 'error');
          return;
      }
      
      // Simulate API call
      setTimeout(() => {
          // Check credentials (in a real app, this would be done server-side)
          if (email === 'demo@example.com' && password === 'password') {
              showMessage('Login successful! Redirecting...', 'success');
              
              // Store login state
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('userEmail', email);
              
              // Redirect to dashboard after 1 second
              setTimeout(() => {
                  window.location.href = 'dashboard.html';
              }, 1000);
          } else {
              showMessage('Invalid email or password', 'error');
          }
      }, 1000);
      
      // Show "Logging in" message while waiting
      showMessage('Logging in...', 'info');
  });
  
  function showMessage(message, type) {
      loginMessage.textContent = message;
      loginMessage.className = '';
      loginMessage.classList.add(type);
      loginMessage.style.display = 'block';
  }
});
