import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x = 0, y = 0, width = 75, height = 10, color = '#51a094') {
    super(x, y, width, height, color);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
