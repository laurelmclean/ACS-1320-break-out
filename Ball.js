import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(color, x = 0, y = 0, radius = 10) {
    super(x, y, 0, 0, color);
    this.color = color;
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  moveTo() {
    this.x += this.dx;
    this.y += this.dy;
  }

  // STRETCH CHALLENGE
  // change ball to random colour every time it bounces off wall or paddle
  randColor() {
    this.color = `#${(Math.floor(Math.random() * 0x1000000) + 0x1000000).toString(16).substring(1)}`;
  }

  // overrides existing render method to draw a circle
  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
