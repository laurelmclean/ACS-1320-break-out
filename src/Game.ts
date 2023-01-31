import Ball from './Ball';
import Paddle from './Paddle';
import Text from './Text';
import Background from './Background';
import Bricks from './Bricks';

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  color: string;
  x: number;
  y: number;
  paddleWidth: number;
  paddleX: number;
  allBricks: Bricks;
  background: Background;
  ball: Ball;
  paddle: Paddle;
  scoreText: Text;
  livesText: Text;
  rightPressed: boolean;
  leftPressed: boolean;


  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = '#51a094';
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.paddleWidth = 75;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;

    // new instances of objects
    this.allBricks = new Bricks();
    this.background = new Background(0, 0, this.canvas.width, this.canvas.height);
    this.ball = new Ball(this.color, this.x, this.y);
    this.paddle = new Paddle(this.paddleX, this.canvas.height - 10);
    this.scoreText = new Text(8, 20, this.color, 0, 'Score: ');
    this.livesText = new Text(this.canvas.width - 65, 20, this.color, 3, 'Lives: ');

    // define variables for pressed buttons with boolean values
    // default value for both is false because at the beginning the control buttons are not pressed
    this.rightPressed = false;
    this.leftPressed = false;

    // invoke setUp method
    this.setUp();
    // invoke draw method
    this.draw();
  }

  setUp(): void {
    this.resetBallAndPaddle();

    const { addEventListener } = document;
    // event listeners to listen for pressed keys
    addEventListener('keydown', this.keyDownHandler.bind(this), false);
    addEventListener('keyup', this.keyUpHandler.bind(this), false);
    // event listener for mouse
    addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }

  // reset ball and paddle
  resetBallAndPaddle(): void {
    // randomize starting x position of ball to change the game play
    this.ball.x = Math.floor(Math.random() * this.canvas.width) + 0;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = 3;
    this.ball.dy = -3;
    this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
  }

  // collision detecting between ball and bricks
  // loop through all the bricks and compare every single brick's position
  // with the ball's coordinates as each frame is drawn
  collisionDetection(): void {
    for (let c = 0; c < this.allBricks.cols; c += 1) {
      for (let r = 0; r < this.allBricks.rows; r += 1) {
      // if the brick is active (its status is 1) we will check whether the collision happens;
      // if a collision does occur we'll set the status of the given brick to 0
      // so it won't be painted on the screen
        const b = this.allBricks.bricks[c][r];
        if (b.status === 1) {
        // if these conditions are met, reverse direction of ball
          if (
            this.ball.x > b.x
          && this.ball.x < b.x + this.allBricks.brickWidth
          && this.ball.y > b.y
          && this.ball.y < b.y + this.allBricks.brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            b.status = 0;
            // STRETCH CHALLENGE - ball changes color when hits brick
            this.ball.randColor();
            // increase score every time a collision occurs
            this.scoreText.value += 1;
            // if all bricks have been destroyed display winning message
            if (this.scoreText.value === this.allBricks.rows * this.allBricks.cols) {
            // eslint-disable-next-line no-alert
              alert('YOU WIN! CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  // paddle moving logic
  movePaddle(): void {
  // can move paddle only within boundaries of canvas
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.moveTo(7);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveTo(-7);
    }
  }

  // when pressed
  // browsers use arrowright or right
  keyDownHandler({ key }: {key:string}): void {
    if (key === 'Right' || key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  // when stopped being pressed
  keyUpHandler({ key }: {key:string}): void {
    if (key === 'Right' || key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  // update the paddle position based on the pointer coordinates
  mouseMoveHandler({ clientX }: {clientX:number}): void {
  // restricting the movement to the size of the Canvas
    const relativeX = clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.moveBy(relativeX - this.paddle.width / 2);
    }
  }

  draw(): void {
  // removes previous shape after each frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // render all objects on screen
    this.background.render(this.ctx);
    this.allBricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.ball.moveTo();
    this.paddle.render(this.ctx);
    this.scoreText.render(this.ctx);
    this.livesText.render(this.ctx);
    this.collisionDetection();
    // touching left or right
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
      // random colour if ball touches left or right
      this.ball.randColor();
    }
    // if ball is touching top, reverse it
    // If the ball was moving upwards with a speed of 2 pixels per frame,
    // now it will be moving "up" with a speed of -2 pixels,
    // which actually equals to moving down at a speed of 2 pixels per frame.
    // else if ball touches bottom it will end game
    // or if ball touching bottom reverse it
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
      // update colour when collision with wall
      this.ball.randColor();
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
    // detect collision between ball and paddle
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
        // update colour when collision with wall
        this.ball.randColor();
      } else {
        this.livesText.value -= 1;
        // if no lives, end game
        if (!this.livesText.value) {
        // eslint-disable-next-line no-alert
          alert('GAME OVER');
          document.location.reload();
        } else {
        // if there are still some lives left then the position of the ball and the paddle are reset
        // along with the movement of the ball.
          this.resetBallAndPaddle();
        }
      }
    }
    this.movePaddle();
    // draw the screen again
    requestAnimationFrame(this.draw.bind(this));
  }
}

export default Game;
