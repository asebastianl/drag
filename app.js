const statusElement = document.querySelector("[data-status]");
const cells = Array.from(document.querySelectorAll("[data-cell]"));
const resetButton = document.querySelector("[data-action='reset']");

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function getWinner() {
  return winningLines.find(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function renderGame() {
  const winningLine = getWinner();
  const isDraw = !winningLine && board.every(Boolean);

  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.disabled = Boolean(board[index]) || gameOver;
  });

  if (winningLine) {
    statusElement.textContent = `${board[winningLine[0]]} wins!`;
    gameOver = true;
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    return;
  }

  if (isDraw) {
    statusElement.textContent = "Draw!";
    gameOver = true;
    return;
  }

  statusElement.textContent = `${currentPlayer}'s turn`;
}

function playCell(index) {
  if (board[index] || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  renderGame();
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  renderGame();
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    playCell(Number(cell.dataset.cell));
  });
});

resetButton.addEventListener("click", resetGame);

renderGame();
