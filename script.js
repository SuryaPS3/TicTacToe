let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const boxes = document.querySelectorAll('.box');
const playerInfo = document.querySelector('.game-info-player-x');
const restartBtn = document.querySelector('.game-info-restart-btn');
const resetBtn = document.querySelector('.game-info-reset-btn');
const scoreContainer = document.querySelector('.score-container');


function initializeGame() {
    boxes.forEach((box, index) => {
        box.querySelector('.boxtext').textContent = '';
        box.addEventListener('click', () => handleBoxClick(box, index));
    });
    
    updateScoreDisplay();
}


function handleBoxClick(box, index) {
    const boxtext = box.querySelector('.boxtext');
    
    if (gameState[index] === "" && gameActive) {
        boxtext.textContent = currentPlayer;
        gameState[index] = currentPlayer;
        
        if (checkWin()) {
            scores[currentPlayer]++;
            updateScoreDisplay();
            playerInfo.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        if (checkDraw()) {
            playerInfo.textContent = "Game Draw!";
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerInfo.textContent = `${currentPlayer}'s Turn`;
    }
}

// Check for win
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

// Check for draw
function checkDraw() {
    return gameState.every(cell => cell !== "");
}

// Update score display
function updateScoreDisplay() {
    scoreContainer.innerHTML = `
        <div class="score-board">
            <div class="score-x">Player X: ${scores.X}</div>
            <div class="score-o">Player O: ${scores.O}</div>
        </div>
    `;
}

// Reset game board
function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    playerInfo.textContent = "X's Turn";
    boxes.forEach(box => {
        box.querySelector('.boxtext').textContent = '';
    });
}

// If pressed, resets scores and game
function resetAll() {
    scores = { X: 0, O: 0 };
    resetGame();
    updateScoreDisplay();
}

// Event listeners
restartBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetAll);
initializeGame();