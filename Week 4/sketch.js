// circle
let posX = [];
let posY = [];
let Size = [];
let colors = [];
let speedX = [];
let speedY = [];

// rect
let posXrect = [];
let posYrect = [];
let Sizerect = [];
let colorrect = [];
let speedXrect = [];
let speedYrect = [];

// amount
let amount;

function setup() {
  createCanvas(1000, 700);

  randomizeShapes();
}

function draw() {
  background(220);

  // Draw and move circles
  for (let i = 0; i < amount; i++) {
    fill(colors[i]);
    circle(posX[i], posY[i], Size[i]);

    // Move circle
    posX[i] += speedX[i];
    posY[i] += speedY[i];

    // Bounce off edges
    if (posX[i] < 0 || posX[i] > width) {
      speedX[i] *= -1;
    }

    if (posY[i] < 0 || posY[i] > height) {
      speedY[i] *= -1;
    }
  }

  // Draw and move rectangles
  for (let j = 0; j < amount; j++) {
    fill(colorrect[j]);
    rect(posXrect[j], posYrect[j], Sizerect[j], Sizerect[j]);

    // Move rectangle
    posXrect[j] += speedXrect[j];
    posYrect[j] += speedYrect[j];

    // Bounce off edges
    if (posXrect[j] < 0 || posXrect[j] + Sizerect[j] > width) {
      speedXrect[j] *= -1;
    }

    if (posYrect[j] < 0 || posYrect[j] + Sizerect[j] > height) {
      speedYrect[j] *= -1;
    }
  }
}

// randomizing shapes, colors and amount
function randomizeShapes() {
  posX = [];
  posY = [];
  Size = [];
  colors = [];
  speedX = [];
  speedY = [];

  posXrect = [];
  posYrect = [];
  Sizerect = [];
  colorrect = [];
  speedXrect = [];
  speedYrect = [];

  // Pick ONE random amount
  amount = int(random(50, 200));

  // Create shapes
  for (let i = 0; i < amount; i++) {

    // Circles
    posX.push(int(random(10, 950)));
    posY.push(int(random(10, 650)));
    Size.push(int(random(10, 75)));

    // Random movement speed
    speedX.push(random(-2, 2));
    speedY.push(random(-2, 2));

    colors.push(color(
      random(255),
      random(255),
      random(255)
    ));

    // Rectangles
    posXrect.push(int(random(10, 950)));
    posYrect.push(int(random(10, 650)));
    Sizerect.push(int(random(10, 75)));

    // Random movement speed
    speedXrect.push(random(-2, 2));
    speedYrect.push(random(-2, 2));

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
