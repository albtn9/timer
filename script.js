const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

let totalTime = 25 * 60; 
let currentTime = totalTime;
let timerInterval = null;
let isRunning = false;
let isBreak = false;

function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
}

function playAlarm() {
  const audio = new Audio('https://www.orangefreesounds.com/wp-content/uploads/2022/03/Desk-bell-small-sound-effect.mp3');
  audio.play().catch(() => console.log('Som bloqueado pelo navegador'));
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startPauseBtn.textContent = '⏸️';

  timerInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay(currentTime);
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      playAlarm();

      if (!isBreak) {
        isBreak = true;
        currentTime = 5 * 60;
        document.body.style.backgroundColor = 'white'; 
        timerDisplay.style.color = 'black';             
        updateDisplay(currentTime);
        startTimer();
      } else {
        isBreak = false;
        currentTime = totalTime;
        document.body.style.backgroundColor = 'black'; 
        timerDisplay.style.color = 'white';            
        updateDisplay(currentTime);
        startTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  isRunning = false;
  startPauseBtn.textContent = '▶️';
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  isBreak = false;
  currentTime = totalTime;
  document.body.style.backgroundColor = 'black'; 
  timerDisplay.style.color = 'white';              
  updateDisplay(currentTime);
}

startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);

updateDisplay(currentTime);
timerDisplay.style.color = 'white'; 
document.body.style.backgroundColor = 'black'; 
