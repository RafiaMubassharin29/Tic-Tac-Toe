const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedIndex = clickedCell.getAttribute('data-index');

  if (gameState[clickedIndex] !== '' || !gameActive) return;

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
  switchPlayer();
};

const checkResult = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!gameState.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  board.forEach(cell => (cell.textContent = ''));
  statusText.textContent = "Player X's turn";
};

board.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
statusText.textContent = "Player X's turn";
