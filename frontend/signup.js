document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Simulate signup success (you can replace this with actual backend call)
    alert('Signup successful! You can now login.');
    window.location.href = 'login.html'; // Redirect to login page
  });
  