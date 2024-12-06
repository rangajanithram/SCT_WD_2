let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0; // Initialize lap count

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;

        timerInterval = setInterval(() => {
            elapsedTime++;
            display.textContent = formatTime(elapsedTime);
            
            // Play sound every second
            if (elapsedTime % 100 === 0) { // Check if a second has passed (100 milliseconds)
                const tickSound = document.getElementById("tickSound");
                tickSound.currentTime = 0; // Reset sound to start
                tickSound.play(); // Play the sound
            }
        }, 10);
    }
}

function pauseTimer() {
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    clearInterval(timerInterval);
}

function resetTimer() {
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCount = 0; // Reset lap count
    display.textContent = "00:00:00:00";
    lapList.innerHTML = ""; // Clear lap list
}

function recordLap() {
    lapCount++; // Increment lap count
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`; // Display lap number and time
    lapList.appendChild(lapItem);
}

function formatTime(time) {
    const hours = String(Math.floor((time / 360000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((time / 6000) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 100) % 60)).padStart(2, '0');
    const milliseconds = String(time % 100).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDarkMode ? "☀" : "🌘︎"; // Change icon 
});