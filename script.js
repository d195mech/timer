// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const settingsToggle = document.getElementById('settings-toggle');
const closeSettings = document.getElementById('close-settings');
const settingsPanel = document.getElementById('settings-panel');
const setTimerBtn = document.getElementById('set-timer-btn');

const inputH = document.getElementById('input-h');
const inputM = document.getElementById('input-m');
const inputS = document.getElementById('input-s');

const fontBtns = document.querySelectorAll('.font-btn');
const lookBtns = document.querySelectorAll('.look-btn');

// Timer State
let timeLeft = 0; // Total seconds
let timerInterval = null;
let isRunning = false;
let initialTime = 0;

// Update Display
function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const formatted = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');

    timerDisplay.textContent = formatted;

    if (timeLeft <= 0 && isRunning) {
        stopTimer();
        alertTimerEnd();
    }
}

function startTimer() {
    if (timeLeft <= 0) return;
    
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    timerDisplay.classList.add('counting');

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    timerDisplay.classList.remove('counting');
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timeLeft = initialTime;
    updateDisplay();
}

function alertTimerEnd() {
    // Subtle visual alert
    timerDisplay.style.color = '#ff4d4d';
    setTimeout(() => {
        timerDisplay.style.color = '';
    }, 2000);
}

// Event Listeners
startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.remove('hidden');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
});

setTimerBtn.addEventListener('click', () => {
    const h = parseInt(inputH.value) || 0;
    const m = parseInt(inputM.value) || 0;
    const s = parseInt(inputS.value) || 0;

    // Cap at 12 hours
    let totalSeconds = (h * 3600) + (m * 60) + s;
    if (totalSeconds > 12 * 3600) totalSeconds = 12 * 3600;

    initialTime = totalSeconds;
    timeLeft = totalSeconds;
    updateDisplay();
    settingsPanel.classList.add('hidden');
});

// Customization listeners
fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const font = btn.getAttribute('data-font');
        timerDisplay.style.fontFamily = `'${font}', sans-serif`;
        
        fontBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

lookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const style = btn.getAttribute('data-style');
        
        timerDisplay.classList.remove('blurred', 'outlined');
        if (style !== 'normal') {
            timerDisplay.classList.add(style);
        }

        lookBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Initial Setup
updateDisplay();
