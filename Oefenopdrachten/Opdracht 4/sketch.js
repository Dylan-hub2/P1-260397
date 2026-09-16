
let value = 255

function setup() {
  createCanvas(400, 400);
}

function draw() {
  strokeWeight(0)
  background(255);
  fill(value)
  rect(10,10,60,60)
}
function keyPressed() 
  if (value === 0) {
    value = 255;
  } else {
    value = 0;


}