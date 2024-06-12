let dictionary = [];

const state = {
    gameOver: false,
    secret: '',
    grid: Array(6)
    .fill()
    .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0
};

async function getRandomWord() {
    const response = await fetch('words.txt');
    const data = await response.text();
    dictionary = data.split('\n').map(word => word.trim());

    let randWord = dictionary[Math.floor(Math.random()*dictionary.length)];
    console.log(randWord);
    state.secret = randWord;
}

function updateGrid() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = ''){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container){
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.appendChild(grid);
}

function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        if (state.gameOver === true) return;

        const key = e.key;
        if (key === 'Enter') {
            if (state.currentCol === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    for (let i = 0; i < 5; i++) {
                        const box = document.getElementById(`box${state.currentRow}${i}`);
                        box.classList.add('animatedShake');
                    }
                    setTimeout(() => {
                        for (let i = 0; i < 5; i++) {
                            const box = document.getElementById(`box${state.currentRow}${i}`);
                            box.classList.remove('animatedShake');
                        }
                    }, 1000);
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }

        updateGrid();
    };
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
    return dictionary.includes(word);
}

function revealWord(guess) {
    const row = state.currentRow;
    const animation_duration = 500; // ms

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter === state.secret[i]) {
                box.classList.add('right');
            } 
            else if (state.secret.includes(letter)) {
                box.classList.add('wrong');
            }
            else {
                box.classList.add('empty');
            }
        }, ((i + 1) * animation_duration) / 2);

        box.classList.add('animatedFlip');
        box.style.animationDelay = `${(i*animation_duration)/2}ms`;
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    setTimeout(() => {
        if (isWinner) {
            const textElements = document.querySelectorAll('.gameOver h2');
            textElements[0].textContent = 'Congrats!';
            textElements[1].textContent = `The word was: ${state.secret}`;
            
            textElements[0].classList.add('animatedAppear');
            textElements[1].classList.add('animatedAppear');

            for (let i = 0; i < 5; i++) {
                const box = document.getElementById(`box${row}${i}`);
                box.classList.add('animatedVerticalShuffle');
            }

            state.gameOver = true;
        }
        else if (isGameOver) {
            const textElements = document.querySelectorAll('.gameOver h2');
            textElements[0].textContent = 'Better luck next time.';
            textElements[1].textContent = `The word was: ${state.secret}`;

            textElements[0].classList.add('animatedAppear');
            textElements[1].classList.add('animatedAppear');

            state.gameOver = true;
        }
    }, 3*animation_duration);
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function removeLetter() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function reset() {
    location.reload();
}

function startup() {
    const game = document.getElementById('game');
    drawGrid(game);
    getRandomWord();

    registerKeyboardEvents();

    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', reset);
}

startup();