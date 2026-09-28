
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let index = 0;
 while( index < 5){
   rect(50,+ (index * 50),50,50);
   index++
 }
}