let currentQuestion = 0;
const totalQuestions = questions.length;
let timeLeft = 60 * 60; // 1 hour in seconds
let timerInterval;
let userAnswers = new Array(totalQuestions).fill(null);

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById('timer');

    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 20) { // 10 minutes
        timerElement.classList.add('warning');
    }

    if (timeLeft <= 0) {
        clearInterval(timerInterval);

        // Store quiz data for feedback page
        const timeUsed = 2 * 2 - timeLeft;
        localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
        localStorage.setItem('timeUsed', timeUsed.toString());

        // Redirect to feedback page
        window.location.href = '/feedback';
    } else {
        timeLeft--;
    }
}

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    const questionContainer = document.getElementById('question');
    const categoryElement = document.getElementById('category');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const progressFill = document.getElementById('progressFill');

    // Update progress
    currentQuestionElement.textContent = questionIndex + 1;
    progressFill.style.width = `${((questionIndex + 1) / totalQuestions) * 100}%`;

    // Update category
    categoryElement.textContent = question.category;

    // Update question
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <div class="options">
            ${question.options.map((option, index) => {
                const optionLetter = String.fromCharCode(97 + index); // a, b, c, d
                const checked = userAnswers[questionIndex] === optionLetter ? 'checked' : '';
                return `<label><input type="radio" name="q${questionIndex}" value="${optionLetter}" ${checked}> ${option}</label>`;
            }).join('')}
        </div>
    `;

    // Add event listener for answer changes on current question
    const radioButtons = questionContainer.querySelectorAll(`input[name="q${questionIndex}"]`);
    radioButtons.forEach(radio => {
        radio.addEventListener('click', (event) => {
            // If this radio button is already checked, uncheck it
            if (event.target.checked && userAnswers[questionIndex] === event.target.value) {
                event.target.checked = false;
                userAnswers[questionIndex] = null;
            } else {
                // Save the new answer
                userAnswers[questionIndex] = event.target.value;
            }
            updateButtonVisibility();
            updateQuestionStatus();
        });
    });

    // Update button states
    updateButtonVisibility();
    // Update question status sidebar
    updateQuestionStatus();
}

function updateQuestionStatus() {
    const allQuestionsGrid = document.getElementById('allQuestionsGrid');

    // Generate HTML for all questions with appropriate styling
    const allQuestionsHTML = userAnswers.map((answer, index) => {
        const questionNumber = index + 1;
        const isAttempted = answer !== null;
        const isCurrent = index === currentQuestion;
        
        let classes = 'question-number';
        if (isCurrent) {
            classes += ' current';
        } else if (isAttempted) {
            classes += ' attempted';
        } else {
            classes += ' not-attempted';
        }
        
        return `<div class="${classes}" onclick="jumpToQuestion(${index})">${questionNumber}</div>`;
    }).join('');

    allQuestionsGrid.innerHTML = allQuestionsHTML;
}

function jumpToQuestion(questionIndex) {
    // Save current answer
    saveCurrentAnswer();
    
    // Jump to the selected question
    currentQuestion = questionIndex;
    showQuestion(currentQuestion);
}

function updateButtonVisibility() {
    const isLastQuestion = currentQuestion === totalQuestions - 1;

    document.getElementById('previousBtn').disabled = currentQuestion === 0;

    if (isLastQuestion) {
        // On last question, hide next button
        document.getElementById('nextBtn').classList.add('hidden');
    } else {
        // On other questions, show next button
        document.getElementById('nextBtn').classList.remove('hidden');
    }
}

function nextQuestion() {
    // Save current answer
    saveCurrentAnswer();

    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function previousQuestion() {
    // Save current answer
    saveCurrentAnswer();

    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function saveCurrentAnswer() {
    const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    userAnswers[currentQuestion] = selected ? selected.value : null;
}

function submitQuiz() {
    // Save final answer
    saveCurrentAnswer();

    clearInterval(timerInterval);

    // Calculate score
    let score = 0;
    let categoryScores = {
        "Computer Science": 0,
        "Reasoning": 0,
        "Math": 0,
        "English": 0
    };

    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
            categoryScores[question.category]++;
        }
    });

    const timeUsed = 60 * 60 - timeLeft;
    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;

    alert(`Quiz completed!\n\nTotal Score: ${score}/${totalQuestions}\n\nCategory Breakdown:\nComputer Science: ${categoryScores["Computer Science"]}/25\nReasoning: ${categoryScores["Reasoning"]}/25\nMath: ${categoryScores["Math"]}/25\nEnglish: ${categoryScores["English"]}/25\n\nTime taken: ${minutes}:${seconds.toString().padStart(2, '0')}`);

    // In a real app, send results to server
    // fetch('/api/submit-quiz', { method: 'POST', body: JSON.stringify({ answers: userAnswers, score, timeUsed }) })
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('previousBtn').addEventListener('click', previousQuestion);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('totalQuestions').textContent = totalQuestions;
    showQuestion(currentQuestion);
    updateQuestionStatus();
    timerInterval = setInterval(updateTimer, 1000);
});