let blocks = [
  // Row 1
  { x: 150, y: 150, color: "grey", winning: false },
  { x: 300, y: 150, color: "grey", winning: false },
  { x: 450, y: 150, color: "grey", winning: false },

  // Row 2
  { x: 150, y: 300, color: "grey", winning: false },
  { x: 300, y: 300, color: "grey", winning: false },
  { x: 450, y: 300, color: "grey", winning: false },

  // Row 3
  { x: 150, y: 450, color: "grey", winning: false },
  { x: 300, y: 450, color: "grey", winning: false },
  { x: 450, y: 450, color: "grey", winning: false }
];

let currentColor = "red";
let winner = "";
let gameOver = false;
let cpuThinking = false;


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

    // Make winning blocks bigger
    if (block.winning) {
      rect(block.x - 10, block.y - 10, 120, 120, 15);
    } 
    else {
      rect(block.x, block.y, 100, 100, 15);
    }
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

  else if (cpuThinking) {
    textSize(30);
    text("CPU'S TURN", 350, 650);
  }

  else {
    textSize(30);
    text("YOUR TURN", 350, 650);
  }


  // Reset button
  if (gameOver) {

    fill(100);
    rect(650, 300, 200, 70, 15);

    fill(255);
    textSize(25);
    text("RESET GAME", 750, 335);
  }
}

// PLAYER CLICK

function mouseClicked() {

  // Check reset button
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


  // Don't allow player to click while CPU is moving
  if (cpuThinking) {
    return;
  }


  // Player is red
  for (let i = 0; i < blocks.length; i++) {

    let block = blocks[i];

    // Check if mouse is inside the block
    if (
      mouseX >= block.x &&
      mouseX <= block.x + 100 &&
      mouseY >= block.y &&
      mouseY <= block.y + 100
    ) {

      // Only grey blocks can be clicked
      if (block.color === "grey") {

        // Make block red
        block.color = "red";

        // Check if player won
        checkWinner();

        // Check for draw
        if (winner === "") {
          checkDraw();
        }

        // If game is still going, CPU plays
        if (!gameOver) {

          currentColor = "blue";
          cpuThinking = true;

          // CPU waits 500 milliseconds
          setTimeout(cpuMove, 500);
        }

        break;
      }
    }
  }
}

// EASY CPU

function cpuMove() {

  // Find all empty blocks
  let emptyBlocks = [];

  for (let i = 0; i < blocks.length; i++) {

    if (blocks[i].color === "grey") {
      emptyBlocks.push(i);
    }
  }


  // If there are empty blocks
  if (emptyBlocks.length > 0) {

    // Pick a random empty block
    let randomIndex = floor(random(emptyBlocks.length));

    // Get the actual block number
    let chosenBlock = emptyBlocks[randomIndex];

    // Make it blue
    blocks[chosenBlock].color = "blue";
  }


  // CPU finished thinking
  cpuThinking = false;

  // Check if CPU won
  checkWinner();

  // Check for draw
  if (winner === "") {
    checkDraw();
  }


  // Give the turn back to player
  if (!gameOver) {
    currentColor = "red";
  }
}

// CHECK WINNER

function checkWinner() {

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


  // Check every combination
  for (let combo of winningCombinations) {

    let first = blocks[combo[0]].color;
    let second = blocks[combo[1]].color;
    let third = blocks[combo[2]].color;


    // Check if all three are the same
    if (
      first !== "grey" &&
      first === second &&
      first === third
    ) {

      winner = first;
      gameOver = true;
      cpuThinking = false;


      // Make winning blocks bigger
      blocks[combo[0]].winning = true;
      blocks[combo[1]].winning = true;
      blocks[combo[2]].winning = true;


      return;
    }
  }
}

// CHECK DRAW

function checkDraw() {

  // Look for grey blocks
  for (let block of blocks) {

    if (block.color === "grey") {
      return;
    }
  }


  // No grey blocks left
  gameOver = true;
  cpuThinking = false;
}

// RESET GAME

function resetGame() {

  // Reset all blocks
  for (let block of blocks) {
    block.color = "grey";
    block.winning = false;
  }


  // Reset game variables
  currentColor = "red";
  winner = "";
  gameOver = false;
  cpuThinking = false;
}
