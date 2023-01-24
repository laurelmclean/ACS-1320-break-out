import Brick from './Brick.js';

class Bricks {
  constructor(rows = 3, cols = 5) {
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    // invoke method
    this.setup();
  }

  // array containing columns, rows, and x and y position
  // code will loop through and create new bricks
  setup() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === 1) {
          const brickX = (c * (75 + 10)) + 30;
          const brickY = (r * (20 + 10)) + 30;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          // Stretch challenge - rows are different colours
          let brickRowColor = '#133337';
          if (r === 1) {
            brickRowColor = '#0e2f44';
          } else if (r === 2) {
            brickRowColor = '#2a6f64';
          }
          const brick = new Brick(brickX, brickY, brickRowColor);
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
