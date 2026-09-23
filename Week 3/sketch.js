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

// CPU can be turned on or off
let cpuEnabled = true;

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(50);

  // Draw base
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

  // Display game text
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

    if (cpuEnabled) {

      if (currentColor === "red") {
        text("YOUR TURN", 350, 650);
      }
      else {
        text("CPU'S TURN", 350, 650);
      }

    }
    else {
      text(currentColor.toUpperCase() + "'S TURN", 350, 650);
    }
  }

  // Draw CPU button
  fill(100);
  rect(650, 150, 200, 70, 15);

  fill(255);
  textSize(25);

  if (cpuEnabled) {
    text("CPU: ON", 750, 185);
  }
  else {
    text("CPU: OFF", 750, 185);
  }

  // Draw reset button when game is over
  if (gameOver) {

    fill(100);
    rect(650, 300, 200, 70, 15);

    fill(255);
    textSize(25);
    text("RESET GAME", 750, 335);
  }
}

function mouseClicked() {

  // Check CPU button
  if (
    mouseX >= 650 &&
    mouseX <= 850 &&
    mouseY >= 150 &&
    mouseY <= 220
  ) {

    if (!cpuThinking) {
      cpuEnabled = !cpuEnabled;
    }

    return;
  }

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

  // Don't allow clicks while CPU is thinking
  if (cpuThinking) {
    return;
  }

  // When CPU is on, the player controls red
  if (cpuEnabled && currentColor !== "red") {
    return;
  }

  // Check every block
  for (let i = 0; i < blocks.length; i++) {

    let block = blocks[i];

    // Check if the mouse is inside the block
    if (
      mouseX >= block.x &&
      mouseX <= block.x + 100 &&
      mouseY >= block.y &&
      mouseY <= block.y + 100
    ) {

      // Only grey blocks can be selected
      if (block.color === "grey") {

        // Give the block the current player's color
        block.color = currentColor;

        // Check for a winner
        checkWinner();

        // Check for a draw
        if (winner === "") {
          checkDraw();
        }

        // Continue the game if nobody won
        if (!gameOver) {

          // Start the CPU's turn
          if (cpuEnabled) {

            currentColor = "blue";
            cpuThinking = true;

            // Wait half a second before the CPU moves
            setTimeout(cpuMove, 500);
          }

          // Switch players when CPU is off
          else {

            if (currentColor === "red") {
              currentColor = "blue";
            }
            else {
              currentColor = "red";
            }
          }
        }

        break;
      }
    }
  }
}

function cpuMove() {

  // Stop if CPU is disabled
  if (!cpuEnabled) {
    cpuThinking = false;
    return;
  }

  // Stop if the game has ended
  if (gameOver) {
    cpuThinking = false;
    return;
  }

  // Find all empty blocks
  let emptyBlocks = [];

  for (let i = 0; i < blocks.length; i++) {

    if (blocks[i].color === "grey") {
      emptyBlocks.push(i);
    }
  }

  // Choose a random empty block
  if (emptyBlocks.length > 0) {

    let randomIndex = floor(random(emptyBlocks.length));

    let chosenBlock = emptyBlocks[randomIndex];

    // Make the chosen block blue
    blocks[chosenBlock].color = "blue";
  }

  // CPU has finished its turn
  cpuThinking = false;

  // Check if the CPU won
  checkWinner();

  // Check for a draw
  if (winner === "") {
    checkDraw();
  }

  // Give the turn back to the player
  if (!gameOver) {
    currentColor = "red";
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

  // Check every winning combination
  for (let combo of winningCombinations) {

    let first = blocks[combo[0]].color;
    let second = blocks[combo[1]].color;
    let third = blocks[combo[2]].color;

    if (
      first !== "grey" &&
      first === second &&
      first === third
    ) {

      // Set the winner
      winner = first;
      gameOver = true;
      cpuThinking = false;

      // Make the winning blocks bigger
      blocks[combo[0]].winning = true;
      blocks[combo[1]].winning = true;
      blocks[combo[2]].winning = true;

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

  // No grey blocks remain, so it is a draw
  gameOver = true;
  cpuThinking = false;
}

function resetGame() {

  // Reset every block
  for (let block of blocks) {
    block.color = "grey";
    block.winning = false;
  }

  // Reset the game
  currentColor = "red";
  winner = "";
  gameOver = false;
  cpuThinking = false;
}
