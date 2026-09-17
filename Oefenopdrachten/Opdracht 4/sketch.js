
let teller = 0;
let verkeerslicht = 0;

// Positie van de 8-ball
let balX = 360;
let balY = 20;
let snelheid = 3;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  
  // 1. WIT BLOKJE MET B

  if (keyIsDown(66)) { // B = 66
    fill(255);
    rect(20, 20, 60, 60);
  }


  // 2. TELLER
  
  teller++;

  if (teller > 500) {
    teller = 0;
  }

  fill(0);
  textSize(30);
  text(teller, 20, 140);


  // 3. VERKEERSLICHT
  

  // Kast van het verkeerslicht
  fill(50);
  rect(20, 240, 70, 170);

  // Rood
  if (verkeerslicht == 0) {
    fill(255, 0, 0);
  } else {
    fill(100);
  }
  circle(55, 270, 40);

  // oranje
  if (verkeerslicht == 1) {
    fill("orange");
  } else {
    fill(100);
  }
  circle(55, 325, 40);

  // Groen
  if (verkeerslicht == 2) {
    fill("Green");
  } else {
    fill(100);
  }
  circle(55, 380, 40);

  
  // 4. MOVING EIGHTBALL
  

  // Bewegen met WASD
  if (keyIsDown(87)) { // W
    balY -= snelheid;
  }
  if (keyIsDown(83)) { // S
    balY += snelheid;
  }
  if (keyIsDown(65)) { // A
    balX -= snelheid;
  }
  if (keyIsDown(68)) { // D
    balX += snelheid;
  }

  // Bewegen met pijltjestoetsen
  if (keyIsDown(UP_ARROW)) {
    balY -= snelheid;
  }
  if (keyIsDown(DOWN_ARROW)) {
    balY += snelheid;
  }
  if (keyIsDown(LEFT_ARROW)) {
    balX -= snelheid;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    balX += snelheid;
  }

  // Aan de andere kant weer verschijnen
  if (balX > width) {
    balX = 0;
  }
  if (balX < 0) {
    balX = width;
  }
  if (balY > height) {
    balY = 0;
  }
  if (balY < 0) {
    balY = height;
  }

  // 8-ball tekenen
  fill(0);
  circle(balX, balY, 60);

  fill(255);
  circle(balX, balY, 30);

  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("8", balX, balY);
  textAlign(LEFT, BASELINE);
}



// SPATIE EN ENTER


function keyPressed() {

  // Spatie = teller op 0
  if (keyCode === 32) {
    teller = 0;
  }

  // Enter = verkeerslicht veranderen
  if (keyCode === ENTER) {
    verkeerslicht++;

    if (verkeerslicht > 2) {
      verkeerslicht = 0;
    }
  }
}
