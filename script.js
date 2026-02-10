const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const board = document.querySelector(".board");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

let currentPlayer = "X";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function handleCellClick() {
  const index = this.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkResult();
}

function startGame() {
  if (gameActive) return;
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  board.classList.remove("inactive");
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;

    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = false;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Click Start Game to begin.";
  cells.forEach(cell => cell.textContent = "");
  board.classList.add("inactive");
}