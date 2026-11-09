
let hunger = 100;
let energy = 80;
let happiness = 70;
let health = 100;

let chickenImage;
let imageLoaded = false;

let currentAction = "none";
let actionTimer = 0;

let saveMessage = "";
let saveMessageTimer = 0;

let lastStatDecay = 0;
let lastHealthDecay = 0;

let bartDead = false;
let deathReason = "";

let meteorActive = false;
let meteorTimer = 0;
let meteorX = -30;
let meteorY = 80;

// SETUP

function setup() {
  createCanvas(600, 500);
  noSmooth();
  textAlign(CENTER, CENTER);

  // Load chicken image
  loadImage(
    "bart.png",
    function(img) {
      chickenImage = img;
      imageLoaded = true;
    },
    function(err) {
      console.error("Could not load bart.png", err);
    }
  );

  loadGame();

  lastStatDecay = frameCount;
  lastHealthDecay = frameCount;

  checkDeath();
}

// SAVE AND LOAD

function saveGame() {
  storeItem("bartSave", {
    hunger: hunger,
    energy: energy,
    happiness: happiness,
    health: health,
    bartDead: bartDead,
    deathReason: deathReason
  });

  saveMessage = "Game saved!";
  saveMessageTimer = 150;
}

function loadGame() {
  let savedData = getItem("bartSave");

  if (savedData) {
    hunger = savedData.hunger ?? 100;
    energy = savedData.energy ?? 80;
    happiness = savedData.happiness ?? 70;
    health = savedData.health ?? 100;
    bartDead = savedData.bartDead ?? false;
    deathReason = savedData.deathReason ?? "";
  }
}

// MOOD

function getMood() {
  if (health <= 30) return "sick";
  if (hunger <= 30) return "hungry";
  if (energy <= 25) return "tired";
  if (happiness <= 30) return "sad";

  return "happy";
}

// MAIN GAME LOOP

function draw() {
  updateGame();
  drawBackground();

  let mood = getMood();

  let chickenY = sin(frameCount * 0.09) * 1.5;

  if (currentAction === "play") {
    chickenY = -abs(sin(frameCount * 0.18)) * 12;
  } else if (currentAction === "sleep") {
    chickenY = 5;
  } else if (mood === "tired") {
    chickenY = 4 + sin(frameCount * 0.035) * 3;
  } else if (mood === "sad" || mood === "hungry") {
    chickenY = 3;
  }

  push();

  translate(width / 2, 240 + chickenY);

  if (bartDead) {
    rotate(HALF_PI);
    translate(0, 12);
  }

  drawChicken();

  pop();

  if (!bartDead) {
    drawActionEffects(mood);
  }

  if (meteorActive) {
    drawMeteor();
  }

  drawStats();
  drawButtons();
  drawSaveButton();
  drawMessages(mood);

  if (bartDead) {
    drawDeathScreen();
  }
}

// BACKGROUND

function drawBackground() {
  background(170, 218, 250);
  noStroke();

  // Clouds
  fill(235, 247, 255);

  rect(55, 65, 45, 12);
  rect(68, 53, 24, 12);

  rect(440, 105, 55, 12);
  rect(453, 93, 24, 12);

  // Sun
  fill(255, 220, 90);

  rect(495, 28, 24, 24);
  rect(487, 36, 40, 8);
  rect(503, 20, 8, 40);

  // Grass
  fill(96, 177, 76);
  rect(0, 350, 600, 150);

  fill(119, 198, 88);
  rect(0, 350, 600, 8);

  // Grass details
  fill(75, 151, 62);

  for (let i = 0; i < 30; i++) {
    let x = (i * 71 + 13) % 600;
    let y = 368 + (i * 17) % 110;

    rect(x, y, 5, 3);
    rect(x + 5, y - 3, 3, 3);
  }

  // Shadow
  fill(62, 133, 59);
  ellipse(300, 347, 125, 15);
}

// CHICKEN

function drawChicken() {
  imageMode(CENTER);

  if (imageLoaded) {
    // Draw original image with its original blue background
    image(chickenImage, 0, 0, 192, 192);
  } else {
    // Fallback chicken if image hasn't loaded
    noStroke();

    fill("#FFF2CF");
    ellipse(0, 0, 125, 115);

    fill("#E64C50");
    rect(-25, -75, 20, 30);
    rect(-5, -85, 20, 40);
    rect(15, -70, 18, 25);

    fill("#382D2A");
    rect(20, -25, 12, 15);

    fill("#F3A52F");
    triangle(45, -5, 75, 5, 45, 15);
  }

  imageMode(CORNER);
}

// ACTION EFFECTS

function drawActionEffects(mood) {
  noStroke();

  if (currentAction === "sleep" || mood === "tired") {
    fill(60, 90, 150);
    textSize(20);

    let rise = sin(frameCount * 0.06) * 5;

    text("Z", 370, 173 + rise);

    textSize(14);
    text("z", 386, 158 + rise);
  }

  if (currentAction === "feed") {
    fill(255, 210, 90);

    rect(370, 232, 7, 7);
    rect(382, 245, 5, 5);
    rect(364, 250, 5, 5);
  }

  if (currentAction === "clean") {
    noFill();
    stroke(130, 220, 255);
    strokeWeight(2);

    let offset = sin(frameCount * 0.1) * 3;

    rect(225, 210 - offset, 12, 12);
    rect(355, 185 + offset, 9, 9);
    rect(365, 270 - offset, 13, 13);
    rect(235, 285 + offset, 8, 8);

    noStroke();
  }

  if (currentAction === "play") {
    fill(255, 225, 90);
    textSize(22);

    text("*", 220, 210);
    text("*", 365, 195);
  }

  if (currentAction === "none") {
    if (mood === "hungry") {
      drawBubble("Food!", 400, 155);
    } else if (mood === "sad") {
      drawBubble(":(", 400, 155);
    } else if (mood === "sick") {
      drawBubble("Help!", 400, 155);
    } else if (mood === "tired") {
      drawBubble("Zzz", 400, 155);
    }
  }
}

function drawBubble(label, x, y) {
  fill(255, 255, 240);
  stroke(90, 110, 110);
  strokeWeight(1);

  rect(x - 34, y - 15, 68, 30, 6);

  noStroke();
  fill(50);
  textSize(14);

  text(label, x, y);
}

// STATS

function drawStats() {
  fill(50, 70, 60);
  textSize(24);
  textStyle(BOLD);

  text("Bart the Chicken", 300, 30);

  textStyle(NORMAL);

  drawStatBar("Hunger", hunger, 30, 67, "#E9A34A");
  drawStatBar("Energy", energy, 175, 67, "#65B8E8");
  drawStatBar("Happiness", happiness, 320, 67, "#F3D35C");
  drawStatBar("Health", health, 465, 67, "#69C879");
}

function drawStatBar(label, value, x, y, barColor) {
  fill(40, 65, 50);
  textSize(13);

  text(label, x + 50, y);

  fill(70, 95, 80);
  rect(x, y + 13, 100, 12, 3);

  fill(value <= 30 ? "#E45B56" : barColor);

  rect(
    x + 2,
    y + 15,
    max(0, value - 4),
    8,
    2
  );

  fill(30, 50, 40);
  textSize(11);

  text(value + "/100", x + 50, y + 39);
}

// BUTTONS

function drawButtons() {
  const buttons = [
    { x: 20, w: 120, label: "Feed", color: "#FFE1A0" },
    { x: 165, w: 120, label: "Play", color: "#B8E5FF" },
    { x: 310, w: 130, label: "Clean", color: "#C4F0D2" },
    { x: 460, w: 120, label: "Sleep", color: "#D4D0FF" }
  ];

  for (let b of buttons) {
    fill(b.color);
    stroke("#718477");
    strokeWeight(2);

    rect(b.x, 410, b.w, 55, 6);

    noStroke();
    fill("#35483B");
    textSize(14);
    textStyle(BOLD);

    text(b.label, b.x + b.w / 2, 437);

    textStyle(NORMAL);
  }
}

// SAVE BUTTON

function drawSaveButton() {
  fill("#FFE58C");
  stroke("#9C8242");
  strokeWeight(2);

  rect(240, 357, 120, 35, 6);

  noStroke();
  fill("#544525");
  textSize(14);
  textStyle(BOLD);

  text("Save", 300, 375);

  textStyle(NORMAL);
}

// MESSAGES

function drawMessages(mood) {
  if (!bartDead) {
    if (mood === "hungry") {
      fill("#A85D1A");
      textSize(14);
      text("Bart is hungry!", 300, 120);
    } else if (mood === "tired") {
      fill("#345E91");
      textSize(14);
      text("Bart is tired!", 300, 120);
    } else if (mood === "sad") {
      fill("#6A5B9B");
      textSize(14);
      text("Bart is sad!", 300, 120);
    } else if (mood === "sick") {
      fill("#B72E38");
      textSize(14);
      text("Bart is sick!", 300, 120);
    }
  }

  if (saveMessageTimer > 0 && !bartDead) {
    saveMessageTimer--;

    fill("#17663C");
    textSize(14);

    text(saveMessage, 300, 340);
  }
}

// GAME UPDATE

function updateGame() {
  if (bartDead) return;

  // Meteor animation
  if (meteorActive) {
    meteorTimer--;

    meteorX += 7.3;
    meteorY += 3.1;

    if (meteorTimer <= 0) {
      meteorActive = false;
      killBartByMeteor();
    }

    return;
  }

  // Action timer
  if (actionTimer > 0) {
    actionTimer--;
  } else {
    currentAction = "none";
  }

  // Stat decay every 120 frames
  if (frameCount - lastStatDecay >= 120) {
    lastStatDecay = frameCount;

    hunger = max(0, hunger - 5);
    happiness = max(0, happiness - 4);

    if (currentAction !== "sleep") {
      energy = max(0, energy - 5);
    }

    // One in 100 chance of a meteor
    if (floor(random(100)) === 0) {
      startMeteor();
    }
  }

  // Health decay
  if (
    hunger <= 0 &&
    frameCount - lastHealthDecay >= 30
  ) {
    lastHealthDecay = frameCount;

    health = max(0, health - 5);
  }

  hunger = constrain(hunger, 0, 100);
  energy = constrain(energy, 0, 100);
  happiness = constrain(happiness, 0, 100);
  health = constrain(health, 0, 100);

  checkDeath();
}

// METEOR

function startMeteor() {
  meteorActive = true;
  meteorTimer = 45;

  meteorX = -30;
  meteorY = 80;

  currentAction = "none";
}

function drawMeteor() {
  push();

  stroke(255, 180, 80);
  strokeWeight(7);

  line(
    meteorX - 35,
    meteorY - 25,
    meteorX,
    meteorY
  );

  noStroke();

  fill(255, 100, 40);
  ellipse(meteorX, meteorY, 24, 24);

  fill(255, 220, 120);
  ellipse(meteorX, meteorY, 13, 13);

  pop();

  fill(255, 70, 40);
  textSize(18);
  textStyle(BOLD);

  text("METEOR!", 300, 120);

  textStyle(NORMAL);
}

function killBartByMeteor() {
  health = 0;

  bartDead = true;
  deathReason = "Bart was hit by a meteor!";

  currentAction = "dead";
  actionTimer = 0;

  saveGame();
}

// DEATH

function checkDeath() {
  if (health <= 0 && !bartDead) {
    health = 0;

    bartDead = true;

    deathReason = "You should have taken better care of him.";

    currentAction = "dead";
    actionTimer = 0;

    saveGame();
  }
}

function drawDeathScreen() {
  fill(20, 30, 40, 190);
  noStroke();

  rect(0, 0, width, height);

  fill(255, 245, 225);
  stroke(100, 70, 60);
  strokeWeight(3);

  rect(65, 105, 470, 295, 12);

  noStroke();
  fill(100, 50, 50);
  textSize(28);
  textStyle(BOLD);

  text("Bart has died.", 300, 135);

  fill(100, 70, 60);
  textSize(15);
  textStyle(NORMAL);

  text(deathReason, 300, 175);

  fill("#FFE7B0");
  stroke("#9C8242");
  strokeWeight(2);

  rect(185, 315, 230, 50, 8);

  noStroke();
  fill("#544525");
  textSize(17);
  textStyle(BOLD);

  text("Start a new game", 300, 340);

  textStyle(NORMAL);
}

// RESTART

function restartGame() {
  hunger = 100;
  energy = 80;
  happiness = 70;
  health = 100;

  bartDead = false;
  deathReason = "";

  meteorActive = false;
  meteorTimer = 0;

  currentAction = "none";
  actionTimer = 0;

  saveMessage = "";
  saveMessageTimer = 0;

  lastStatDecay = frameCount;
  lastHealthDecay = frameCount;

  saveGame();
}

// MOUSE CONTROLS

function mousePressed() {
  if (bartDead) {
    if (
      mouseX > 185 && mouseX < 415 &&
      mouseY > 315 && mouseY < 365
    ) {
      restartGame();
    }

    return;
  }

  if (meteorActive) return;

  // FEED
  if (
    mouseX > 20 && mouseX < 140 &&
    mouseY > 410 && mouseY < 465
  ) {
    hunger = min(100, hunger + 20);
    energy = min(100, energy + 5);

    currentAction = "feed";
    actionTimer = 100;
  }

  // PLAY
  else if (
    mouseX > 165 && mouseX < 285 &&
    mouseY > 410 && mouseY < 465
  ) {
    happiness = min(100, happiness + 20);
    energy = max(0, energy - 10);

    currentAction = "play";
    actionTimer = 100;
  }

  // CLEAN
  else if (
    mouseX > 310 && mouseX < 440 &&
    mouseY > 410 && mouseY < 465
  ) {
    health = min(100, health + 15);
    happiness = min(100, happiness + 5);

    currentAction = "clean";
    actionTimer = 100;
  }

  // SLEEP
  else if (
    mouseX > 460 && mouseX < 580 &&
    mouseY > 410 && mouseY < 465
  ) {
    currentAction = "sleep";
    actionTimer = 300;

    energy = min(100, energy + 20);
  }

  // SAVE
  else if (
    mouseX > 240 && mouseX < 360 &&
    mouseY > 357 && mouseY < 392
  ) {
    saveGame();
  }
}
