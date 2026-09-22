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

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(50);
strokeWeight(0)
  // base
  fill(25);
  rect(100, 100, 500, 500, 25);

  // Draw blocks
  for (let block of blocks) {

    if (block.color === "grey") {
      fill(50);
    } 
    else if (block.color === "red") {
      fill(255, 0, 0);
    } 
    else if (block.color === "blue") {
      fill(0, 0, 255);
    }

    rect(block.x, block.y, 100, 100, 15);
  }
}

function mouseClicked() {

  for (let block of blocks) {

    if (
      mouseX >= block.x &&
      mouseX <= block.x + 100 &&
      mouseY >= block.y &&
      mouseY <= block.y + 100
    ) {

      // Grey → Red → Blue → Grey
      if (block.color === "grey") {
        block.color = "red";
      } 
      else if (block.color === "red") {
        block.color = "blue";
      } 
      else {
        block.color = "grey";
      }
    }
  }
}
