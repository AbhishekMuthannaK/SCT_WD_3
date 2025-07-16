let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.querySelector('.message');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restart').addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const clickedCellIndex = cell.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    cell.innerHTML = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerHTML = 'It\'s a Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = '';
    cells.forEach(cell => cell.innerHTML = '');
}
