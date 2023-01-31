class Text {
  constructor(x, y, color, value, displayText) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = value;
    this.font = '16px Arial';
    this.displayText = displayText;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    // first param is text, and then coordinates
    ctx.fillText(`${this.displayText}${this.value}`, this.x, this.y);
  }
}

export default Text;
