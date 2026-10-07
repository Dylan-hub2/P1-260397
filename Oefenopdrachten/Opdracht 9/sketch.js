let ballen = [];
let score = 0;

function setup() {
  createCanvas(400, 400);
  background(30, 40, 80);

  // Create the first set of balls
  nieuweBallen();
}

function draw() {
  background(30, 40, 80);

  // Loop through all the balls
  for (let i = 0; i < ballen.length; i++) {
    let bal = ballen[i];

    // Draw the ball using the stored RGB color
    fill(bal.color.r, bal.color.g, bal.color.b);
    noStroke();
    circle(bal.x, bal.y, bal.size);

    // Check if the ball hits the left or right edge.
    // Half of the size is used so the ball stays inside the canvas.
    if (
      bal.x + bal.xSpeed < bal.size / 2 ||
      bal.x + bal.xSpeed > width - bal.size / 2
    ) {
      bal.xSpeed *= -1;
    }

    // Check if the ball hits the top or bottom edge.
    if (
      bal.y + bal.ySpeed < bal.size / 2 ||
      bal.y + bal.ySpeed > height - bal.size / 2
    ) {
      bal.ySpeed *= -1;
    }

    // Update the position of the ball
    bal.x += bal.xSpeed;
    bal.y += bal.ySpeed;
  }

  // Display the current score
  fill(255);
  textSize(20);
  text("Score: " + score, 10, 25);

  // Create new balls when all balls have been removed
  if (ballen.length === 0) {
    nieuweBallen();
  }
}

// Creates a new set of balls
function nieuweBallen() {
  // Create 10 new balls
  for (let i = 0; i < 10; i++) {
    ballen.push({
      x: random(25, width - 25),
      y: random(25, height - 25),
      size: random(10, 50),

      // Set a random speed between -5 and 5
      xSpeed: random(-5, 5),
      ySpeed: random(-5, 5),

      // Give each ball a random RGB color
      color: {
        r: random(0, 255),
        g: random(0, 255),
        b: random(0, 255)
      }
    });
  }
}

// This function runs when the mouse is pressed
function mousePressed() {
  // Loop through all the balls
  for (let i = 0; i < ballen.length; i++) {
    let bal = ballen[i];

    // Calculate the distance between the mouse and the center of the ball
    let afstand = dist(mouseX, mouseY, bal.x, bal.y);

    // Check if the mouse clicked inside the ball
    if (afstand < bal.size / 2) {
      // Increase the score
      score++;

      // Remove the clicked ball from the list
      ballen.splice(i, 1);

      // Move the loop one step back so no ball gets skipped
      i--;
    }
  }
}
