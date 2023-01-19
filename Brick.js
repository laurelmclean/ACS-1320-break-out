import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = true; // adds a new property
  }

  // brick variables
brickRowCount = 3;
brickColumnCount = 5;
brickWidth = 75;
brickHeight = 20;
brickPadding = 10;
brickOffsetTop = 30;
brickOffsetLeft = 30;

// array containing columns, rows, and x and y position
// code will loop through and create new bricks
bricks = [];
for (lc = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

  render(ctx) {
    for (let c = 0; c < brickColumnCount; c += 1) {
      for (let r = 0; r < brickRowCount; r += 1) {
        if (bricks[c][r].status === 1) {
        // calculations that will work out the x & y position of each brick for each loop iteration
        // brickX position is worked out as brickWidth & brickPadding
        // multiplied by the column number, c, plus the brickOffsetLeft
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          // Stretch challenge - rows are different colours
          let brickRowColor = '#133337';
          if (r === 1) {
            brickRowColor = '#0e2f44';
          } else if (r === 2) {
            brickRowColor = '#2a6f64';
          }
          ctx.fillStyle = brickRowColor;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}

export default Brick;
