function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);

  // Huizen
  tekenHuis(100, 200, 1);
  tekenHuis(350, 150, 0.8);
  tekenHuis(600, 220, 1.2);

  // Voorbeelden
  tekenCirkel(100, 100, 40);
  tekenRechthoek(200, 50, 100, 40);
  tekenLijn(300, 50, 500, 100);
  tekenTekst("Mijn huizen!", 20, 30, 24, "blue");

  // Rekenen
  tekenTekst("Optellen: " + optellen(10, 5), 20, 350, 18, "black");
  tekenTekst("Delen: " + delen(10, 5), 200, 350, 18, "black");
  tekenTekst("Vermenigvuldigen: " + vermenigvuldigen(10, 5), 350, 350, 18, "black");
  tekenTekst("Aftrekken: " + aftrekken(10, 5), 600, 350, 18, "black");
}

// Huis
function tekenHuis(x, y, grootte) {
  fill("lightblue");
  rect(x, y, 100 * grootte, 100 * grootte);

  // Dak
  fill("red");
  triangle(
    x, y,
    x + 50 * grootte, y - 60 * grootte,
    x + 100 * grootte, y
  );

  // Deur
  fill("brown");
  rect(x + 35 * grootte, y + 50 * grootte, 30 * grootte, 50 * grootte);

  // Ramen
  fill("white");
  rect(x + 10 * grootte, y + 25 * grootte, 20 * grootte, 20 * grootte);
  rect(x + 70 * grootte, y + 25 * grootte, 20 * grootte, 20 * grootte);
}

// Cirkel
function tekenCirkel(x, y, straal) {
  fill("yellow");
  circle(x, y, straal * 2);
}

// Rechthoek
function tekenRechthoek(x, y, breedte, hoogte) {
  fill("green");
  rect(x, y, breedte, hoogte);
}

// Lijn
function tekenLijn(x1, y1, x2, y2) {
  stroke("black");
  line(x1, y1, x2, y2);
}

// Tekst
function tekenTekst(tekst, x, y, grootte, kleur) {
  fill(kleur);
  textSize(grootte);
  text(tekst, x, y);
}

// Optellen
function optellen(getal1, getal2) {
  return getal1 + getal2;
}

// Delen
function delen(getal1, getal2) {
  return getal1 / getal2;
}

// Vermenigvuldigen
function vermenigvuldigen(getal1, getal2) {
  return getal1 * getal2;
}

// Aftrekken
function aftrekken(getal1, getal2) {
  return getal1 - getal2;
}