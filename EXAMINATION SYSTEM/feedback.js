// Feedback Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect feedback data
        const feedbackData = {
            difficulty: document.getElementById('difficulty').value,
            timeSufficient: document.getElementById('time-sufficient').value,
            comments: document.getElementById('comments').value,
            timestamp: new Date().toISOString()
        };

        // Get quiz answers from localStorage
        const userAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '[]');
        const timeUsed = parseInt(localStorage.getItem('timeUsed') || '3600');

        // Calculate score
        let score = 0;
        let categoryScores = {
            "Computer Science": 0,
            "Reasoning": 0,
            "Math": 0,
            "English": 0
        };

        // Import questions data (this would normally be from questions.js)
        // For now, we'll assume questions are available or fetch them
        fetch('/api/questions')
            .then(response => response.json())
            .then(questions => {
                questions.forEach((question, index) => {
                    if (userAnswers[index] === question.correct) {
                        score++;
                        categoryScores[question.category]++;
                    }
                });

                const minutes = Math.floor(timeUsed / 60);
                const seconds = timeUsed % 60;

                // Show results with feedback
                const resultsMessage = `Quiz completed with feedback!

Final Score: ${score}/${questions.length}

Category Breakdown:
Computer Science: ${categoryScores["Computer Science"]}/25
Reasoning: ${categoryScores["Reasoning"]}/25
Math: ${categoryScores["Math"]}/25
English: ${categoryScores["English"]}/25

Time taken: ${minutes}:${seconds.toString().padStart(2, '0')}

Feedback Submitted:
- Difficulty: ${feedbackData.difficulty}
- Time sufficient: ${feedbackData.timeSufficient}
${feedbackData.comments ? `- Comments: ${feedbackData.comments}` : ''}`;

                alert(resultsMessage);

                // Clear stored data
                localStorage.removeItem('quizAnswers');
                localStorage.removeItem('timeUsed');

                // Redirect to home or login page
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error loading questions:', error);
                alert('Error submitting quiz. Please try again.');
            });
    });
});