class Text {
  x: number;
  y: number;
  color: string;
  value: number;
  font: string;
  displayText: string;

  constructor(x: number, y: number, color: string, value: number, displayText: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = value;
    this.font = '16px Arial';
    this.displayText = displayText;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    // first param is text, and then coordinates
    ctx.fillText(`${this.displayText}${this.value}`, this.x, this.y);
  }
}

export default Text;
