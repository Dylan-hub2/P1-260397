function setup() {
  createCanvas(1500, 1400);
}

function draw() {
  background(220);

  let index = 0;
 while( index < 10){
   rect(+ (index * 50),50,50,50);
   index++

   if(index === 6 )
   fill("blue")
  else if(index > -1)
    fill(255)
  }
 let index2 = -1;
 while( index2 < 5){
   rect(750,+ (index2 * 50),50,50);
   index2++

   if(index2 === 0)
    fill(0)

  if(index2 === 1)
    fill(50)

  if(index2 === 2)
    fill(100)

  if(index2 === 3)
    fill(150)

  if(index2 === 4)
    fill(255)
 }
}
