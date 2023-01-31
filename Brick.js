import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, color, width = 75, height = 20) {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = 1; // adds a new property
  }
}

export default Brick;
