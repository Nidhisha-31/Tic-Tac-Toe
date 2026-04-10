const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let gameActive = true;

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.innerText = cell;
    div.addEventListener("click", handleClick);
    board.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let won = false;
  winningConditions.forEach(condition => {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      won = true;
    }
  });

  if (won) {
    showResult(`Player ${currentPlayer} Wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    showResult("It's a Draw!");
    gameActive = false;
  }
}

function showResult(message) {
  resultText.innerText = message;
  resultScreen.style.visibility = "visible";
}

function restartGame() {
  gameState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "Player X's Turn";
  resultScreen.style.visibility = "hidden";
  createBoard();
}

createBoard();