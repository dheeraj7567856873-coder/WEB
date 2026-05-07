document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            this.reset();
            // Redirect to quiz page
            window.location.href = 'quiz.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Network error. Please try again.');
        console.error('Login error:', error);
    }
});

// Forgot username handler
document.getElementById('forgotUsername').addEventListener('click', async function(event) {
    event.preventDefault();
    const email = prompt('Enter your email address:');
    if (!email) return;

    try {
        const response = await fetch('/api/forgot-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        alert(data.message || data.error);
    } catch (error) {
        alert('Network error. Please try again.');
    }
});

// Forgot password handler
document.getElementById('forgotPassword').addEventListener('click', async function(event) {
    event.preventDefault();
    const email = prompt('Enter your email address:');
    if (!email) return;

    try {
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        alert(data.message || data.error);
    } catch (error) {
        alert('Network error. Please try again.');
    }
});