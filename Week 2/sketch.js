function setup() {
  createCanvas(800, 600);
}

let x = 0
let autostart = 0.1

function draw() {
  background(255);
  strokeWeight(0)
// ik ga eerst de dingen zonder variablelelele doen
  fill("#99eafe")
  rect(0,0,800, 600)

  fill("#524d4d")
  triangle(250,50,25,500,500,500)
fill("#023800")
  rect(0,500,800,150)

  fill("#4e534e")
  rect(0,505,800,150)

  fill(0)
rect(708,400,10,100)  
 
fill(0)
rect(700,400,25,75)  

fill("#ffd634")
rect(0,550,800,5)
// boem
fill("#632e02")
rect(50,425,25,75)  

fill("#01570e")
circle(62,415,75)

fill("#632e02")
rect(150,425,25,75)  

fill("#01570e")
circle(162,415,75)

fill("#632e02")
rect(250,425,25,75)  

fill("#01570e")
circle(262,415,75)
// na deze regel doe ik met variebelelele
x += 0.01 * deltaTime;
fill('yellow');
circle(x, 40, 75);

if (x >= 850) {
  x = 0;
} else {
  x += 0.01 * deltaTime;
}

autostart += 0.05 * deltaTime;
fill('#000000');
rect(autostart, 600, 100, 100);

circle(autostart, 650, 25);

if (autostart >= 850) {
  autostart = 0;
} else {
  autostart += 0.05 * deltaTime;
}

}
