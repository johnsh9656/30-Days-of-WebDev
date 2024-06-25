let timerInterval;
let _isPaused = true;
let _timeLeft;

const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const minutesInput = document.getElementById('minutes');
const countdownElmnt = document.getElementById('countdown');
const notesTextArea = document.getElementById('notes');

chrome.storage.local.get(['timeLeft', 'isPaused'], (result) => {
    if (result.timeLeft !== undefined && result.isPaused !== undefined) {
      _timeLeft = result.timeLeft;
      _isPaused = result.isPaused;
      updateCountdown(_timeLeft);
      if (!result.isPaused) {
        startPauseBtn.textContent = 'Pause';
      }
    }
});

startPauseBtn.addEventListener('click', () => {
    const minutes = parseInt(minutesInput.value);
    const seconds = minutes * 60;
    chrome.runtime.sendMessage({ action: _isPaused ? 'startTimer' : 'pauseTimer', _timeLeft: seconds });
    startPauseBtn.textContent = _isPaused ? 'Pause' : 'Start';
    _isPaused = !_isPaused;
});

resetBtn.addEventListener('click', () => {
    const minutes = parseInt(minutesInput.value);
    const seconds = minutes * 60;
    chrome.runtime.sendMessage({ action: 'resetTimer', timeLeft: seconds });
    startPauseBtn.textContent = 'Start';
    _isPaused = true;
});

notesTextArea.addEventListener('input', () => {
    const notes = notesTextArea.value;
    chrome.storage.local.set({ notes });
});

chrome.storage.local.get('notes', (result) => {
    if (result.notes) {
        notesTextArea.value = result.notes;
    }
});

minutesInput.addEventListener('input', () => {
    const minsInput = minutesInput.value;
    chrome.storage.local.set({ minsInput });
});

chrome.storage.local.get('minsInput', (result) => {
    if (result.minsInput) {
        minutesInput.value = result.minsInput;
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateCountdown') {
      updateCountdown(message.timeLeft);
    }
});

function updateCountdown(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    countdownElmnt.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
