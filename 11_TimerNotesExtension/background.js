let timerInterval;
let timeLeft = 0;
let isPaused = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ timeLeft, isPaused });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    if (message.timeLeft !== undefined) {
      timeLeft = message.timeLeft;
    }
    startTimer();
  } else if (message.action === 'pauseTimer') {
    pauseTimer();
  } else if (message.action === 'resetTimer') {
    timeLeft = message.timeLeft;
    resetTimer();
  }
  chrome.storage.local.set({ timeLeft, isPaused });
  sendResponse();
});

function startTimer() {
  if (isPaused) {
    isPaused = false;
    timerInterval = setInterval(() => {
      if (!isPaused && timeLeft > 0) {
        timeLeft--;
        chrome.runtime.sendMessage({ action: 'updateCountdown', timeLeft });
        chrome.storage.local.set({ timeLeft });
        if (timeLeft === 0) {
          clearInterval(timerInterval);
          doNotification();
        }
      }
    }, 1000);
  }
}

function pauseTimer() {
  isPaused = true;
  clearInterval(timerInterval);
}

function resetTimer() {
  isPaused = true;
  clearInterval(timerInterval);
  chrome.runtime.sendMessage({ action: 'updateCountdown', timeLeft });
  chrome.storage.local.set({ timeLeft, isPaused });
}

function doNotification() {
  chrome.notifications.create({
  type: 'basic',
  iconUrl: 'scroll.png',
  title: 'Timer Finished',
  message: 'Your countdown timer has finished!',
  priority: 2
  });
}