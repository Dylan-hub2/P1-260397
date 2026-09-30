// circle
let posX = [];
let posY = [];
let Size = [];
let colors = [];

// rect
let posXrect = [];
let posYrect = [];
let Sizerect = [];
let colorrect = [];

// amount
let amount;

function setup() {
  createCanvas(1000, 700);

  randomizeShapes();
}

function draw() {
  background(220);

  // Draw circles
  for (let i = 0; i < amount; i++) {
    fill(colors[i]);
    circle(posX[i], posY[i], Size[i]);
  }

  // Draw rectangles
  for (let j = 0; j < amount; j++) {
    fill(colorrect[j]);
    rect(posXrect[j], posYrect[j], Sizerect[j], Sizerect[j]);
  }
}

// randomizing shapes, colors and amount
function randomizeShapes() {
  posX = [];
  posY = [];
  Size = [];
  colors = [];

  posXrect = [];
  posYrect = [];
  Sizerect = [];
  colorrect = [];

  // Pick ONE random amount
  amount = int(random(100, 200));

  // Create that many shapes
  for (let i = 0; i < amount; i++) {
    posX.push(int(random(10, 950)));
    posY.push(int(random(10, 650)));
    Size.push(int(random(10, 75)));

    posXrect.push(int(random(10, 950)));
    posYrect.push(int(random(10, 650)));
    Sizerect.push(int(random(10, 75)));

    colors.push(color(
      random(255),
      random(255),
      random(255)
    ));

    colorrect.push(color(
      random(255),
      random(255),
      random(255)
    ));
  }
}

// randomizing when spacebar is pressed
function keyPressed() {
  if (key === ' ') {
    randomizeShapes();
  }
}
