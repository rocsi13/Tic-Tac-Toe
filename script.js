let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let cells = document.querySelectorAll(".cell");
cells = Array.from(cells);

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

cells.forEach(function (cell) {
    cell.addEventListener('click', function() {
        if (gameActive) {
            let roundWon = false;
            if (cell.innerText.trim() != "") {
                return;
            }
            cell.innerText = currentPlayer;
            gameState[cell.getAttribute('data-cell-index')] = currentPlayer;
            for (let i = 0; i <= 7; ++i) {
                const winCondition = winningConditions[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
            if (roundWon) {
                document.getElementById("message").innerText = "Player " + currentPlayer + " has won!";
                gameActive = false;
                return;
            }
            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                document.getElementById("message").innerText = "It's a draw!";
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer == "X" ? "O" : "X";
            document.getElementById("message").innerText = "It's " + currentPlayer + "'s turn!";
        }
    });
});

function restartGame() {
    document.location.reload();
}
