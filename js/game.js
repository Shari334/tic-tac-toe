// Get Elements
const gameBoard = document.getElementById("gameboard");
const tiles = document.querySelectorAll(".tile");
const arrayTiles = Array(tiles.length);
const playerX = "X";
const playerO = "O";
let   title = document.getElementById("title");
let turn = playerX;

arrayTiles.fill(null);

tiles.forEach((tile) => tile.addEventListener("click", tileClicked));

//sounds
const gameOverSound = new Audio("sounds/sounds_game_over.wav");
const tileClickSound = new Audio("sounds/sounds_click.wav");

//hover text 
function setHoverText() {
    //remove all hover text
    tiles.forEach((tile) => {
      tile.classList.remove("x-hover");
      tile.classList.remove("o-hover");
    });
  
    const hoverClass = `${turn.toLowerCase()}-hover`;
  
    tiles.forEach((tile) => {
      if (tile.innerText === "") {
        tile.classList.add(hoverClass);
      }
    });
  }
  setHoverText();
    function tileClicked(event) {
    const tile = event.target;
    const tileNumber = tile.dataset.index; 
    if(tile.innerText != "") {
        return;
    }
    if (turn === playerX) {
        tile.innerText = playerX;
        arrayTiles[tileNumber - 1] = playerX;
        turn = playerO;
    }else{
        tile.innerText = playerO;
        arrayTiles[tileNumber - 1] = playerO;
        turn = playerX;
    }
    checkWinner();
    setHoverText();
    tileClickSound.play();
}
function checkWinner() {
      //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const {combo} = winningCombination;
    const tileValue1 = arrayTiles[combo[0] - 1];
    const tileValue2 = arrayTiles[combo[1] - 1];
    const tileValue3 = arrayTiles[combo[2] - 1];

    if (
        tileValue1 != null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
      ) {
        title.innerText = `${tileValue1} is the Winner!`; 
        gameBoard.classList.add("noClicks");
        gameOverSound.play();
      }
    }
    // Check for Draw 
    const allTilesFilled = arrayTiles.every((tile) => tile !== null);
    if (allTilesFilled) {
        gameOver();
    }
    function gameOver() {
        let drawText = "It's a Draw! Play Again?";
        title.innerText = drawText;
        gameOverSound.play();
    }
}
// Restart Game
function restart() {
    window.location.reload();
}
const winningCombinations = [
    //rows
    { combo: [1, 2, 3]},
    { combo: [4, 5, 6]},
    { combo: [7, 8, 9]},
    //columns
    { combo: [1, 4, 7] },
    { combo: [2, 5, 8] },
    { combo: [3, 6, 9] },
    //diagonals
    { combo: [1, 5, 9] },
    { combo: [3, 5, 7] },
  ];



