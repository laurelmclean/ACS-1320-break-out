import Brick from './Brick.js';

class Bricks {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.bricks = [];
  }

  // brick drawing logic
  drawBricks(ctx) {
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    for (let c = 0; c < this.columns; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    for (let c = 0; c < this.columns; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === 1) {
        // calculations that will work out the x & y position of each brick for each loop iteration
        // brickX position is worked out as brickWidth & brickPadding
        // multiplied by the column number, c, plus the brickOffsetLeft
          const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          const brick = new Brick(brickX, brickY);
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
