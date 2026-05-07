document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, confirmPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            this.reset();
            // Optionally redirect to login
            // window.location.href = 'login.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Network error. Please try again.');
        console.error('Signup error:', error);
    }
});