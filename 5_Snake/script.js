const board = document.querySelector('.board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.highScore');
const controls = document.querySelectorAll('.controls i')
const retryBtn = document.querySelector('.retryBtn');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let keyPressed = false;

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

function updateFoodPosition() {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}

function handleGameOver() {
    gameOver = true;
    clearInterval(setIntervalId);
    document.querySelector('.wrapper').classList.add('animatedShake');
}

function changeDirection(e) {
    if (keyPressed) return;
    keyPressed = true;

    if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.key === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener('click', () => 
    changeDirection({key:button.dataset.key})));

function handleRetryBtn() {
    location.reload();
}

function initGame() {
    if (gameOver) return; 

    keyPressed = false;
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);

        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('highScore', highScore);

        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY > 20) {
        handleGameOver();
        return;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (i === 0) {
            html += `<div id="leader" class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        } else {
            html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        }
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            handleGameOver();
        }
    }
    board.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 150);
document.addEventListener('keyup', changeDirection);
retryBtn.addEventListener('click', handleRetryBtn);