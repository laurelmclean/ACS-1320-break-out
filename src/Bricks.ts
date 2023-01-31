import Brick from './Brick';

class Bricks {
  rows: number;
  cols: number;
  bricks: Brick[][];
  brickWidth: number;
  brickHeight: number;
  brickPadding: number;
  brickOffset: number;

  constructor(rows: number = 3, cols: number = 5) {
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffset = 30;
    // invoke method
    this.setup();
  }

  // array containing columns, rows, and x and y position
  // code will loop through and create new bricks
  setup(): void {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffset;
        const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffset;
        // Stretch challenge - rows are different colours
        let brickRowColor = '#133337';
        if (r === 1) {
          brickRowColor = '#0e2f44';
        } else if (r === 2) {
          brickRowColor = '#2a6f64';
        }
        const brick = new Brick(brickX, brickY, brickRowColor);
        this.bricks[c][r] = brick
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === 1) {
          const brick = this.bricks[c][r]
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
