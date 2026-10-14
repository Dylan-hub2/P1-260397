let hunger = 100;
let energy = 80;
let happiness = 70;
let health = 100;

// Store the current action
let currentAction = "none";
let actionTimer = 0;

function setup() {
  createCanvas(600, 500);
  textAlign(CENTER);
}

function draw() {
  background(190, 225, 255);

  // Draw the grass
  noStroke();
  fill(120, 200, 100);
  rect(0, 350, 600, 150);

  // Update the action timer
  if (actionTimer > 0) {
    actionTimer--;
  } else {
    currentAction = "none";
  }

  // Make the chicken jump when playing
  let chickenY = 0;

  if (currentAction === "play") {
    chickenY = -20;
  }

  // Draw the chicken's body
  fill(255, 245, 210);
  ellipse(300, 300 + chickenY, 150, 120);

  // Draw the chicken's head
  ellipse(300, 220 + chickenY, 100, 90);

  // Draw the chicken's comb
  fill(220, 40, 50);
  ellipse(280, 175 + chickenY, 20, 30);
  ellipse(300, 168 + chickenY, 20, 35);
  ellipse(320, 175 + chickenY, 20, 30);

  // Draw the chicken's eye
  fill(0);
  ellipse(320, 210 + chickenY, 10, 10);

  // Change the beak depending on the action
  fill(255, 165, 0);

  if (currentAction === "feed") {
    // Open beak while eating
    triangle(
      340, 220 + chickenY,
      370, 230 + chickenY,
      340, 245 + chickenY
    );

    // Draw the food
    fill(240, 190, 50);
    ellipse(375, 255, 18, 12);
    ellipse(385, 250, 12, 10);

  } else {
    // Normal beak
    triangle(
      340, 220 + chickenY,
      365, 230 + chickenY,
      340, 238 + chickenY
    );
  }

  // Draw the chicken's legs
  stroke(220, 120, 0);
  strokeWeight(5);

  if (currentAction === "play") {
    // Raised legs while jumping
    line(275, 350 + chickenY, 260, 340 + chickenY);
    line(325, 350 + chickenY, 340, 340 + chickenY);
  } else {
    line(275, 350 + chickenY, 270, 375 + chickenY);
    line(325, 350 + chickenY, 330, 375 + chickenY);
  }

  noStroke();

  // Draw cleaning bubbles
  if (currentAction === "clean") {
    noFill();
    stroke(100, 200, 255);
    strokeWeight(3);

    ellipse(230, 250, 25, 25);
    ellipse(360, 180, 20, 20);
    ellipse(370, 300, 30, 30);
    ellipse(250, 320, 18, 18);

    noStroke();
  }

  // Display the chicken's name
  fill(50);
  textSize(24);
  text("Bart de kip", 300, 40);

  // Display statistics
  textSize(16);
  text("Honger: " + hunger, 100, 90);
  text("Energie: " + energy, 230, 90);
  text("Geluk: " + happiness, 360, 90);
  text("Gezondheid: " + health, 500, 90);

  // Draw buttons
  fill(255);
  rect(20, 410, 120, 55, 10);
  rect(170, 410, 120, 55, 10);
  rect(320, 410, 120, 55, 10);

  // Display button labels
  fill(50);
  text("Voeren", 80, 442);
  text("Spelen", 230, 442);
  text("Schoonmaken", 380, 442);

  // Change stats over time
  if (frameCount % 120 === 0) {
    hunger = min(100, hunger - 15);
    energy = max(0, energy - 1);
    happiness = max(0, happiness - 1);
  }
  if (hunger <= 30){
    strokeWeight(2)
    fill("white")
   rect(350,120,100,45,5)
   fill(0)
   text("Voed mij",400,150)
 }
 if (hunger <= 1){
  if(frameCount(30)){
    health -= 20
  }
  if(frameCount(60)){
    frameCount = 0
  }
 }
}
// Handle mouse clicks
function mousePressed() {

  // Feed the chicken
  if (
    mouseX > 20 && mouseX < 140 &&
    mouseY > 410 && mouseY < 465
  ) {
    hunger = max(0, hunger + 15);
    energy = min(100, energy + 10);

    currentAction = "feed";
    actionTimer = 90;
  }

  // Play with the chicken
  else if (
    mouseX > 170 && mouseX < 290 &&
    mouseY > 410 && mouseY < 465
  ) {
    happiness = min(100, happiness + 15);
    energy = max(0, energy - 10);

    currentAction = "play";
    actionTimer = 90;
  }

  // Clean the chicken
  else if (
    mouseX > 320 && mouseX < 440 &&
    mouseY > 410 && mouseY < 465
  ) {
    health = min(100, health + 15);

    currentAction = "clean";
    actionTimer = 90;
  }
}