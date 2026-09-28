function setup() {
  createCanvas(800, 400);
  background(220);

  // Teksten
  text("1. 10 blokjes op een rij", 20, 15);
  text("2. 5 blokjes onder elkaar", 20, 375);
  text("3. 4 blokjes naast elkaar", 80, 105);
  text("4. 4 blauwe blokjes naast elkaar", 80, 205);
  text("5. 6 cirkels naast elkaar", 540, 20);
  text("6. Bullseye", 350, 105);
  text("7. Accordeon", 625, 105);

  // 1. Blokjes
  for (let i = 0; i < 10; i++) {
    if (i == 6) {
      fill(0, 0, 255);
    } else {
      fill(255);
    }

    square(i * 50, 25, 50);
  }

  // 2. Zwart naar wit
  for (let i = 0; i < 5; i++) {
    let kleur = i * 63.75;
    fill(kleur);
    square(20, 120 + i * 50, 40);
  }

  // 3. Groene blokjes
  let breedte = 25;

  for (let i = 0; i < 4; i++) {
    fill(0, 80 + i * 50, 0);
    rect(80 + i * 60, 120, breedte, 50);
    breedte += 25;
  }

  // 4. Blauwe blokjes
  let breedte4 = 25;
  let hoogte4 = 50;

  for (let i = 0; i < 4; i++) {
    let blauw = 255 - i * 85;
    fill(0, 0, blauw);

    rect(80 + i * 70, 220, breedte4, hoogte4);

    breedte4 += 25;
    hoogte4 += 25;
  }

  // 5. Cirkels
  for (let i = 0; i < 6; i++) {
    strokeWeight(1 + i * 2);
    fill(255);
    circle(560 + i * 35, 55, 25);
  }

  strokeWeight(1);

  // 6. Bullseye
  for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }

    circle(425, 155, 100 - i * 10);
  }

  // 7. Accordeon
  for (let i = 0; i < 21; i++) {
    let breedte7;

    if (i <= 10) {
      breedte7 = 5 + i * 5;
    } else {
      breedte7 = 55 - (i - 10) * 5;
    }

    fill(100);
    rect(625 + i * 8, 120, breedte7, 50);
  }
}