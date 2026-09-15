function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  strokeWeight(0)

  fill("#42b3ff")
  rect(0,0,800, 600)

  fill("#888080")
  triangle(250,50,25,450,500,450)

  fill("#888080")
  triangle(500,300,250,450,100,450)

}
