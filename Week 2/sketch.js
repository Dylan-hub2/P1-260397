//zon en maan
let Zonx = 0;
let Zony = 40;
let ZonstartX = Zonx;
let ZonstartY = Zony;
let Zonkleur = "yellow";

//auto
let autostart = 0;
let auto2 = -200;
let keyPress = 0;
let verkeerslicht = 0;
let teller = 0;

let car1speed = 0.15;
let car2speed = 0.5;

//wolk
let wolkstart = 850;
let wolkstart2 = 825;
let wolkstart3 = 810;
let wolkstart4 = 830;

//ufo
let ufo1 = 2500;


function setup() {
  createCanvas(800, 600);
}


function draw() {
  background("lightblue")
  strokeWeight(0);

  //zon en maan
  Zonx += 0.02 * deltaTime;

  // Als de zon uit beeld is, begint hij opnieuw
  if (Zonx >= 860) {
    Zonx = -60;
  }

  
// Zon
  fill(Zonkleur);
  circle(Zonx, Zony, 75);




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
  rect(672.5, 340, 25, 165);


  // Rood
  if (verkeerslicht === 0) {
    fill(255, 0, 0);
  } else {
    fill(100);
  }

  circle(685, 270, 40);


  // Oranje
  if (verkeerslicht === 2) {
    fill("orange");
  } else {
    fill(100);
  }

  circle(685, 325, 40);


  // Groen
  if (verkeerslicht === 1) {
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


  // wolk deel 1
  wolkstart -= 0.05 * deltaTime;

  if (wolkstart <= -100) {
    wolkstart = 850;
  }

  fill("white");
  circle(wolkstart, 95, 45);

  // wolk deel 2
  wolkstart2 -= 0.05 * deltaTime;

  if (wolkstart2 <= -100) {
    wolkstart2 = 850;
  }
// wolk deel 3
  fill("white");
  circle(wolkstart2, 95, 45);
  // wolk deel 3
  wolkstart3 -= 0.05 * deltaTime;

  if (wolkstart3 <= -100) {
    wolkstart3 = 850;
  }

  fill("white");
  circle(wolkstart3, 95, 45);


  // wolk deel 4
  wolkstart4 -= 0.05 * deltaTime;

  if (wolkstart4 <= -100) {
    wolkstart4 = 850;
  }

  fill("white");
  circle(wolkstart4, 80, 45);

// ufo
ufo1 -= 0.1 * deltaTime

if (ufo1 <= -100) {
  ufo1 = 2500
}


circle(ufo1,95,60)
fill("grey")
ellipse(ufo1,100,125,50)


  // Verkeerslicht bepaalt snelheid
  if (verkeerslicht > 2) {
    verkeerslicht = 0;
  }

  if (verkeerslicht === 0) {
    car1speed = 0;
    car2speed = 0;
  } else if (verkeerslicht === 2) {
    car1speed = 0.075;
    car2speed = 0.25;
  } else if (verkeerslicht === 1) {
    car1speed = 0.15;
    car2speed = 0.5;
  }


  // Autobaan 1
  autostart += car1speed * deltaTime;

  if (autostart >= 850) {
    autostart = -150;
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


  // Extra boom
  fill("#632e02");
  rect(450, 525, 25, 75);

  fill("#01570e");
  circle(462, 515, 75);
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
