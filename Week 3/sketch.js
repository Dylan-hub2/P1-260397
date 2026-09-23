let blocks = [
  // Row 1
  { x: 150, y: 150, color: "grey" },
  { x: 300, y: 150, color: "grey" },
  { x: 450, y: 150, color: "grey" },

  // Row 2
  { x: 150, y: 300, color: "grey" },
  { x: 300, y: 300, color: "grey" },
  { x: 450, y: 300, color: "grey" },

  // Row 3
  { x: 150, y: 450, color: "grey" },
  { x: 300, y: 450, color: "grey" },
  { x: 450, y: 450, color: "grey" }
];

let currentColor = "red";
let winner = "";
let gameOver = false;

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(50);

  // Base
  fill(25);
  rect(100, 100, 500, 500, 25);

  // Draw blocks
  for (let block of blocks) {

    if (block.color === "grey") {
      fill(50);
    }

    if (block.color === "red") {
      fill(255, 0, 0);
    }

    if (block.color === "blue") {
      fill(0, 0, 255);
    }

    rect(block.x, block.y, 100, 100, 15);
  }

  // Game text
  fill(255);
  textAlign(CENTER, CENTER);

  if (winner !== "") {
    textSize(50);
    text(winner.toUpperCase() + " WINS!", 350, 650);
  }

  else if (gameOver) {
    textSize(50);
    text("DRAW!", 350, 650);
  }

  else {
    textSize(30);
    text(currentColor.toUpperCase() + "'S TURN", 350, 650);
  }

  // Only show reset button when game is over
  if (gameOver) {

    fill(100);
    rect(650, 300, 200, 70, 15);

    fill(255);
    textSize(25);
    text("RESET GAME", 750, 335);
  }
}


function mouseClicked() {

  // Only check reset button when game is over
  if (gameOver) {

    if (
      mouseX >= 650 &&
      mouseX <= 850 &&
      mouseY >= 300 &&
      mouseY <= 370
    ) {
      resetGame();
    }

    return;
  }

  // Check every block
  for (let i = 0; i < blocks.length; i++) {

    let block = blocks[i];

    // Check if mouse is inside block
    if (
      mouseX >= block.x &&
      mouseX <= block.x + 100 &&
      mouseY >= block.y &&
      mouseY <= block.y + 100
    ) {

      // Only grey blocks can be selected
      if (block.color === "grey") {

        // Set block to current player's color
        block.color = currentColor;

        // Check for winner
        checkWinner();

        // Check for draw if nobody won
        if (winner === "") {
          checkDraw();
        }

        // Change player
        if (!gameOver) {

          if (currentColor === "red") {
            currentColor = "blue";
          }

          else {
            currentColor = "red";
          }
        }

        break;
      }
    }
  }
}


function checkWinner() {

  // All possible winning combinations
  let winningCombinations = [

    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check each combination
  for (let combo of winningCombinations) {

    let first = blocks[combo[0]].color;
    let second = blocks[combo[1]].color;
    let third = blocks[combo[2]].color;

    if (
      first !== "grey" &&
      first === second &&
      first === third
    ) {

      winner = first;
      gameOver = true;

      return;
    }
  }
}


function checkDraw() {

  // Check if any grey blocks remain
  for (let block of blocks) {

    if (block.color === "grey") {
      return;
    }
  }

  // No grey blocks = draw
  gameOver = true;
}


function resetGame() {

  // Make every block grey
  for (let block of blocks) {
    block.color = "grey";
  }

  // Red starts again
  currentColor = "red";

  // Remove winner
  winner = "";

  // Start a new game
  gameOver = false;
}
