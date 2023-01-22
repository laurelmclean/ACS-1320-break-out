import Sprite from './Sprite.js';

class Background extends Sprite {
  constructor(x, y, width, height, color = '#a8d3cc') {
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

export default Background;
