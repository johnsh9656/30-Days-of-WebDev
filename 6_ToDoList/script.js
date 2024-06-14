const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const timerElmt = document.getElementById('timer');
const startingMinutes = 10;
var time = startingMinutes * 60;
var timerInterval;
var timerRunning = true;

function addTask() {
    if (inputBox.value === '') return;

    let li = document.createElement('li');
    li.innerText = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);

    inputBox.value = '';
    saveData()
}

function togglePauseTimer() {
    if (time <= 0) {
        resetTimer();
    }

    if (timerRunning) {
        clearInterval(timerInterval);
    }
    else {
        timerInterval = setInterval(updateTimer, 1000);
    }

    timerRunning = !timerRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    time = startingMinutes * 60;
    timerInterval = setInterval(updateTimer, 1000);
    timerRunning = true;
}

function updateTimer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElmt.innerHTML = `${minutes}:${seconds}`;
    time--;

    if (time <= 0) {
        time = 0;
        clearInterval(timerInterval);
    }
    else if (seconds === '00' || seconds === 30) saveData();
}

listContainer.addEventListener('click', function(e){
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
    else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }

    saveData()
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
    localStorage.setItem('time', time);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem('data');
    time = localStorage.getItem('time') || startingMinutes * 60;
    timerInterval = setInterval(updateTimer, 1000);
    timerRunning = true;
}

loadData();

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') addTask();
});