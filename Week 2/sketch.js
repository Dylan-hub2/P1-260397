let x = 0;
let autostart = 0;
let auto2 = -200;
let keyPress = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  strokeWeight(0);

  // Achtergrond
  fill("#99eafe");
  rect(0, 0, 800, 600);

  // Berg
  fill("#524d4d");
  triangle(250, 50, 25, 500, 500, 500);

  // Gras
  fill("#023800");
  rect(0, 500, 800, 150);

  // Weg
  fill("#4e534e");
  rect(0, 505, 800, 150);

  // Paaltje
  fill(0);
  rect(708, 400, 10, 100);
  rect(700, 400, 25, 75);

  // Gele lijn
  fill("#ffd634");
  rect(0, 550, 800, 5);

  // Bomen
  fill("#632e02");
  rect(50, 425, 25, 75);
  fill("#01570e");
  circle(62, 415, 75);

  fill("#632e02");
  rect(150, 425, 25, 75);
  fill("#01570e");
  circle(162, 415, 75);

  fill("#632e02");
  rect(250, 425, 25, 75);
  fill("#01570e");
  circle(262, 415, 75);

  // Gele cirkel / zon
  x += 0.01 * deltaTime;

  fill("yellow");
  circle(x, 40, 75);

  if (x >= 850) {
    x = 0;
  }

  
  // AUTO 1

  
  autostart += 0.15 * deltaTime;

  if (autostart >= 850) {
    autostart = -100;
  }

  fill("#000dff");
  rect(autostart, 450, 100, 75);

  fill("#000000");
  circle(autostart + 20, 525, 25);
  circle(autostart + 80, 525, 25);

  // AUTO 2
  
  auto2 += 0.5 * deltaTime;

  if (auto2 >= 850) {
    auto2 = -150;
  }

  fill("#ff0000");
  rect(auto2, 535, 100, 50);

  fill("#000000");
  circle(auto2 + 20, 585, 25);
  circle(auto2 + 80, 585, 25);
}

function keyPressed() {
  if (keyCode === ENTER) {
    keyPress += 1;

    if (keyPress >= 4) {
      keyPress = 1;
    }

    if (keyPress === 1) {
      autostart = 0.2;
    } 
    else if (keyPress === 2) {
      autostart = 0.1;
    } 
    else if (keyPress === 3) {
      autostart = 0;
    }
  }
  
}
