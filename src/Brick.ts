import Sprite from './Sprite';

class Brick extends Sprite {
  status: number;
  x: number;
  y: number;

  constructor(x: number, y: number, color: string, width: number = 75, height: number = 20) {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = 1; // adds a new property
  }
}

export default Brick;
