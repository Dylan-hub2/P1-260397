let hunger = 100;
let energy = 80;
let happiness = 70;
let health = 100;

// Current action
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

  // Update action timer
  if (actionTimer > 0) {
    actionTimer--;
  } else {
    currentAction = "none";
  }

  // Chicken movement
  let chickenY = 0;

  if (currentAction === "play") {
    chickenY = -20;
  }

  // Chicken body
  fill(255, 245, 210);
  ellipse(300, 300 + chickenY, 150, 120);

  // Chicken head
  ellipse(300, 220 + chickenY, 100, 90);

  // Comb
  fill(220, 40, 50);
  ellipse(280, 175 + chickenY, 20, 30);
  ellipse(300, 168 + chickenY, 20, 35);
  ellipse(320, 175 + chickenY, 20, 30);

  // Eye: closed when sleeping
  if (currentAction === "sleep") {
    stroke(0);
    strokeWeight(3);
    line(
      313, 210 + chickenY,
      327, 210 + chickenY
    );
    noStroke();
  } else {
    fill(0);
    ellipse(320, 210 + chickenY, 10, 10);
  }

  // Beak
  fill(255, 165, 0);

  if (currentAction === "feed") {
    // Open beak while eating
    triangle(
      340, 220 + chickenY,
      370, 230 + chickenY,
      340, 245 + chickenY
    );

    // Food
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

  // Legs
  stroke(220, 120, 0);
  strokeWeight(5);

  if (currentAction === "play") {
    line(275, 350 + chickenY, 260, 340 + chickenY);
    line(325, 350 + chickenY, 340, 340 + chickenY);
  } else {
    line(275, 350 + chickenY, 270, 375 + chickenY);
    line(325, 350 + chickenY, 330, 375 + chickenY);
  }

  noStroke();

  // Cleaning bubbles
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

  // Sleep Z symbols
  if (currentAction === "sleep") {
    fill(50, 80, 160);
    textSize(22);
    text("Z z z", 365, 175 + chickenY);
  }

  // Name
  fill(50);
  textSize(24);
  text("Bart de kip", 300, 40);

  // Statistics
  textSize(16);
  text("Honger: " + hunger, 100, 90);
  text("Energie: " + energy, 230, 90);
  text("Geluk: " + happiness, 360, 90);
  text("Gezondheid: " + health, 500, 90);

  // Hunger warning
  if (hunger <= 30) {
    fill("white");
    stroke(50);
    strokeWeight(1);
    rect(350, 120, 100, 45, 5);
    noStroke();

    fill(0);
    textSize(14);
    text("Voed mij!", 400, 148);
  }

  // Buttons
  const buttons = [
    { x: 20,  w: 120, label: "Voeren" },
    { x: 165, w: 120, label: "Spelen" },
    { x: 310, w: 130, label: "Schoonmaken" },
    { x: 460, w: 120, label: "Slapen" }
  ];

  for (let b of buttons) {
    fill(255);
    stroke(120);
    strokeWeight(1);
    rect(b.x, 410, b.w, 55, 10);

    noStroke();
    fill(50);
    textSize(15);
    text(b.label, b.x + b.w / 2, 442);
  }

  // Stats decrease over time
  if (frameCount % 120 === 0) {
    hunger = max(0, hunger - 5);
    happiness = max(0, happiness - 3);

    // Energy decreases only when not sleeping
    if (currentAction !== "sleep") {
      energy = max(0, energy - 1);
    }
  }

  // Health decreases if Bart is starving
  if (hunger <= 0 && frameCount % 30 === 0) {
    health = max(0, health - 5);
  }

  // Health warning
  if (health <= 0) {
    fill(255, 0, 0);
    textSize(28);
    text("Bart sterft!", 300, 130);
  }
}

function mousePressed() {
  // Feed
  if (
    mouseX > 20 && mouseX < 140 &&
    mouseY > 410 && mouseY < 465
  ) {
    hunger = min(100, hunger + 15);
    energy = min(100, energy + 10);

    currentAction = "feed";
    actionTimer = 90;
  }

  // Play
  else if (
    mouseX > 165 && mouseX < 285 &&
    mouseY > 410 && mouseY < 465
  ) {
    happiness = min(100, happiness + 15);
    energy = max(0, energy - 10);

    currentAction = "play";
    actionTimer = 90;
  }

  // Clean
  else if (
    mouseX > 310 && mouseX < 440 &&
    mouseY > 410 && mouseY < 465
  ) {
    health = min(100, health + 15);

    currentAction = "clean";
    actionTimer = 90;
  }

  // Sleep
  else if (
    mouseX > 460 && mouseX < 580 &&
    mouseY > 410 && mouseY < 465
  ) {
    currentAction = "sleep";
    actionTimer = 300;
    energy = min(100, energy + 20);
  }
}