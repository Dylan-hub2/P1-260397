let rowX1 = 100;
let rowX2 = 150
let rowX3 = 200
let rowY1 = 100;
let rowY2 = 150;
let rowY3 = 150;

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(50);
  strokeWeight(0)
  fill(25)
  rect(100, 100, 500, 500, 25)

  // row 1
  fill(100)
  rect(rowX1, rowY1, 100, 100, 15)
  rowY1 = 100 + 50
  rowX1 = 250 + 50

  rect(rowX1, rowY1, 100, 100, 15)
  rowY1 = 150 + 150
  rowX1 = 250 + 50

  rect(rowX1, rowY1, 100, 100, 15)
  rowY1 = 250 + 200
  rowX1 = 250 + 50

  //row 2 
  rect(rowX2, rowY2, 100, 100, 15)
  rowY2 = 100 + 50

  rect(rowX2, rowY2, 100, 100, 15)
  rowY2 = 150 + 150

  rect(rowX2, rowY2, 100, 100, 15)
  rowY2 = 250 + 200

  // row 3  
  rect(rowX3, rowY3, 100, 100, 15)
  rowX3 = 400 + 50
  rowY3 = 450
  rect(rowX3, rowY3, 100, 100, 15)
  rowX3 = 400 + 50
  rowY3 = 300

  rect(rowX3, rowY3, 100, 100, 15)
  rowX3 = 400 + 50
  rowY3 = 150


}
function mouseclicked() {



}

