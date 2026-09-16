let x = 0;
let autostart = 0;
let auto2 = -200;
let keyPress = 0;
let verkeerslicht = 0;

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

// Kast
  fill(50);
  rect(20, 240, 70, 170);

  // Rood
  if (verkeerslicht == 0) {
    fill(255, 0, 0);
  } else {
    fill(100);
  }
  circle(55, 270, 40);

  // Oranje
  if (verkeerslicht == 1) {
    fill("orange");
  } else {
    fill(100);
  }
  circle(55, 325, 40);

  // Groen
  if (verkeerslicht == 2) {
    fill("green");
  } else {
    fill(100);
  }
  circle(55, 380, 40);


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
if (keyCode === ENTER) {
  verkeerslicht++;

  if (verkeerslicht > 2) {
    verkeerslicht = 0;
  }
} 