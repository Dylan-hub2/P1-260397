let colors;
let numbers;
let numbers1;
let numbers2;
let word;
let randomColors;
let randomNumbers;

function setup() {
  createCanvas(400, 350);

  // 1. Kleuren
  colors = ["red", "green", "blue", "purple", "yellow"];

  // 2. Shift en push
  colors.shift();
  colors.push("red");

  // 3. Splice
  let colors3 = ["red", "green", "blue", "purple", "yellow"];
  colors3.splice(2, 2);

  // 4. Getallen
  numbers = [400, 240, 10, 490, 30, 60, 244, 500, 301, 300];

  // 5. Arrays
  numbers1 = [3, 55, 93, 20, 102, 6];
  numbers2 = [14, 22, 80, 5];

  // 6. Woord
  word = "Overheidsfinancieringstekort.";

  // 7. Sorteren
  let colors7 = ["red", "green", "blue", "purple", "yellow"];
  colors7.sort();

  // 8. Random kleuren
  randomColors = [];

  for (let i = 0; i < 5; i++) {
    randomColors.push(
      color(random(255), random(255), random(255))
    );
  }

  // 9. Random getallen
  randomNumbers = [];

  for (let i = 0; i < 12; i++) {
    randomNumbers.push(round(random(0, 100)));
  }
}

function draw() {
  background(240);
  fill(0);
  textSize(12);

  // 1. Kleuren
  text("1. Kleuren:", 20, 15);

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    text(colors[i], 20, 30 + i * 15);
  }

  // 2. Shift + push
  fill(0);
  text("2. Shift + push:", 20, 100);

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    text(colors[i], 20, 115 + i * 15);
  }

  // 3. Splice
  let colors3 = ["red", "green", "blue", "purple", "yellow"];
  colors3.splice(2, 2);

  fill(0);
  text("3. Splice:", 20, 190);

  for (let i = 0; i < colors3.length; i++) {
    fill(colors3[i]);
    text(colors3[i], 20, 205 + i * 15);
  }

  // 4. Getallen < 300
  fill(0);
  text("4. Getallen < 300:", 20, 250);

  let y = 265;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < 300) {
      text(numbers[i], 20, y);
      y += 15;
    }
  }

  // 5. Arrays optellen
  fill(0);
  text("5. Arrays optellen:", 120, 15);

  for (let i = 0; i < numbers1.length; i++) {
    let totaal = numbers1[i];

    if (i < numbers2.length) {
      totaal += numbers2[i];
    }

    text(totaal, 120, 30 + i * 15);
  }

  // 6. Letters tellen
  let aantalE = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() == "e") {
      aantalE++;
    }
  }

  fill(0);
  text("6. Letters tellen:", 120, 100);
  text("e komt " + aantalE + " keer voor", 120, 115);

  // 7. Alfabetisch
  let colors7 = ["red", "green", "blue", "purple", "yellow"];
  colors7.sort();

  fill(0);
  text("7. Alfabetisch:", 120, 190);

  for (let i = 0; i < colors7.length; i++) {
    fill(colors7[i]);
    text(colors7[i], 120, 205 + i * 15);
  }

  // 8. Random kleuren
  fill(0);
  text("8. Random kleuren:", 120, 280);

  for (let i = 0; i < randomColors.length; i++) {
    fill(randomColors[i]);
    rect(120 + i * 30, 290, 25, 25);
  }

  // 9. Random getallen
  fill(0);
  text("9. Random getallen:", 240, 15);

  let totaal = 0;

  for (let i = 0; i < randomNumbers.length; i++) {
    text(randomNumbers[i], 240, 30 + i * 15);
    totaal += randomNumbers[i];
  }

  let gemiddelde = totaal / randomNumbers.length;

  text("Totaal: " + totaal, 240, 225);
  text("Gemiddelde: " + gemiddelde.toFixed(2), 240, 240);
}
