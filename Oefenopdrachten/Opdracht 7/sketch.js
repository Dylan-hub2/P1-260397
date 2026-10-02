let px = 10;

const mario = [
  "        RRRRRRRR        ",
  "      RRRRRRRRRRRR      ",
  "     RRRRRRRRRRRRRR     ",
  "     RRRRRRRRRRRRRR     ",
  "     HHHSSSSSSHHH       ",
  "    HHHSSSSSSSSHHH      ",
  "    HHHSSSSSSSSSS       ",
  "     SSSSSSSSSSSS       ",
  "      SSSSSSSSSSS       ",
  "       HHHHHHHH         ",
  "       SSSSSSSSS        ",
  "      RRRRRRRRRRR       ",
  "     RRRRRRRRRRRRR      ",
  "    RRRBBBBBBBBBRRR     ",
  "    RRRBBBBBBBBBRRR     ",
  "     BBBYBBBBYBBB       ",
  "      BBBBBBBBB         ",
  "      BBBBBBBBB         ",
  "       BBBBBBB          ",
  "       BBB BBB          ",
  "      BBB   BBB         ",
  "     DDDD   DDDD        ",
  "    DDDDD   DDDDD       "
];

function setup() {
  createCanvas(320, 300);
  noStroke();
  noSmooth();
  clear();
}

function draw() {
  clear();
  drawMario(45, 25);
}

function drawMario(x, y) {

  for (let row = 0; row < mario.length; row++) {
    for (let col = 0; col < mario[row].length; col++) {

      let pixel = mario[row][col];

      switch (pixel) {

        // Red hat and shirt
        case "R":
          fill("#E52521");
          break;

        // Brown hair / moustache
        case "H":
          fill("#6B3518");
          break;

        // Skin
        case "S":
          fill("#FFBD8A");
          break;

        // Blue overalls
        case "B":
          fill("#0055A4");
          break;

        // Yellow buttons
        case "Y":
          fill("#FFD700");
          break;

        // Shoes
        case "D":
          fill("#6B3518");
          break;

        // Empty pixel
        default:
          continue;
      }

      rect(
        x + col * px,
        y + row * px,
        px,
        px
      );
    }
  }
}
