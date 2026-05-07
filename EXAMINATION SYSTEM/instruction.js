let time = 600; // 10 minutes

function startExam() {
    let confirmStart = confirm("Please start the exam after some time");
    if (confirmStart) {
        startTimer();
    }
}

function startTimer() {
    let timerDisplay = document.getElementById("timer");

    let interval = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.innerText = minutes + ":" + seconds;

        // When 3 minutes left (180 seconds)
        if (time <= 180) {
            timerDisplay.classList.add("warning");
        }

        time--;

        if (time < 0) {
            clearInterval(interval);
            alert("Time is over");
            window.location.href = "quiz.html";
        }
    }, 1000);
}