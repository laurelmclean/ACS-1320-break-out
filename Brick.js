import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, color, width = 75, height = 20) {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = true; // adds a new property
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
