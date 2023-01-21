import Sprite from './Sprite.js';

class Text extends Sprite {
  constructor(x = 0, y = 0, radius = 10, color = '#0095DD') {
    super(x, y, 0, 0, color);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }