let x = 0;
let autostart = 0;
let auto2 = -200;
let keyPress = 0;
let verkeerslicht = 0;
let car1speed = 0.15
let car2speed = 0.5
let wolkstart = 850
let wolkstart2 = 825
let wolkstart3 = 835
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
  triangle(250, 125, 25, 500, 500, 500);

  // Gras
  fill("#023800");
  rect(0, 500, 800, 150);

  // Weg
  fill("#4e534e");
  rect(0, 505, 800, 150);

// Kast
  fill(50);
  rect(650, 240, 70, 170);

  // Rood
  if (verkeerslicht == 0) {
    fill(255, 0, 0);
  } else {
    fill(100);
  }
  circle(685, 270, 40);

  // Oranje
  if (verkeerslicht == 2) {
    fill("orange");
  } else {
    fill(100);
  }
  circle(685, 325, 40);

  // Groen
  if (verkeerslicht == 1) {
    fill("green");
  } else {
    fill(100);
  }
  circle(685, 380, 40);


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

  // zon
  x += 0.01 * deltaTime;

  fill("yellow");
  circle(x, 40, 75);

  if (x >= 850) {
    x = 0;
  }
// wolk deel 1
  wolkstart -= 0.05 * deltaTime;

  fill("white");
  circle(wolkstart, 95, 45);
  
  if (wolkstart <= -50) {
    wolkstart = 850;
  }
  // wolk deel 2
  wolkstart2 -= 0.05 * deltaTime;

  fill("white");
  circle(wolkstart2, 95, 45);
  
  if (wolkstart2 <= -50) {
    wolkstart2 = 850;
  }
// wolk deel 3
wolkstart3 -= 0.05 * deltaTime;

  fill("white");
  circle(wolkstart3, 80, 40);
  
  if (wolkstart3 <= -50) {
    wolkstart3 = 850;
  }

  // AUTO 1


  autostart += car1speed * deltaTime;

  if (autostart >= 850) {
    autostart = -100;
  }

  fill("#000dff");
  rect(autostart, 450, 100, 75);

  fill("#000000");
  circle(autostart + 20, 525, 25);
  circle(autostart + 80, 525, 25);

  // AUTO 2
  
  auto2 += car2speed * deltaTime;

  if (auto2 >= 850) {
    auto2 = -150;
  }

  fill("#ff0000");
  rect(auto2, 535, 100, 50);

  fill("#000000");
  circle(auto2 + 20, 585, 25);
  circle(auto2 + 80, 585, 25);

    if (verkeerslicht > 2) {
    verkeerslicht = 0;
    } else if (verkeerslicht == 0) {
    car1speed = 0
    car2speed = 0
    } else if (verkeerslicht == 2) {
      car1speed = 0.075
      car2speed = 0.25
    } else if (verkeerslicht == 1) {
      car1speed = 0.15
      car2speed = 0.5
    }
      
  
}

function keyPressed() {

    // Spatie = teller op 0
  if (keyCode === 32) {
    teller = 0;
  }

  // Enter = verkeerslicht veranderen
  if (keyCode === ENTER) {
    verkeerslicht++;
  }
    
}



    
