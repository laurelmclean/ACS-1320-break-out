import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Text from './Text.js';
import Background from './Background.js';
import Bricks from './Bricks.js';

class Game {
  constructor() {
    this.color = '#51a094';
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.paddleWidth = 75;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;

    // new instances of objects
    this.allBricks = new Bricks();
    this.background = new Background(0, 0, canvas.width, canvas.height);
    this.ball = new Ball(this.color, this.x, this.y);
    this.paddle = new Paddle(this.paddleX, canvas.height - 10);
    this.scoreText = new Text(8, 20, this.color, 0, 'Score: ');
    this.livesText = new Text(canvas.width - 65, 20, this.color, 3, 'Lives: ');

    // define variables for pressed buttons with boolean values
    // default value for both is false because at the beginning the control buttons are not pressed
    this.rightPressed = false;
    this.leftPressed = false;

    this.setUp();

    this.draw();
  }

  setUp() {
    this.resetBallAndPaddle();

    // FIX ME
    const { addEventListener } = document;
    // event listeners to listen for pressed keys
    addEventListener('keydown', this.keyDownHandler, false);
    addEventListener('keyup', this.keyUpHandler, false);
    // event listener for mouse
    addEventListener('mousemove', this.mouseMoveHandler, false);
  }

  resetBallAndPaddle() {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.dx = 3;
    this.ball.dy = -3;
    this.paddle.x = (canvas.width - this.paddle.width) / 2;
  }

  // collision detecting between ball and bricks
  // loop through all the bricks and compare every single brick's position
  // with the ball's coordinates as each frame is drawn
  collisionDetection() {
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
  movePaddle() {
  // can move paddle only within boundaries of canvas
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveTo(7);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveTo(-7);
    }
  }

  // when pressed
  // browsers use arrowright or right
  keyDownHandler({ key }) {
    if (key === 'Right' || key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  // when stopped being pressed
  keyUpHandler({ key }) {
    if (key === 'Right' || key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  // update the paddle position based on the pointer coordinates
  mouseMoveHandler({ clientX }) {
  // restricting the movement to the size of the Canvas
  // need to update so paddle wont disappear off left side
    const relativeX = clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveBy(relativeX - this.paddle.width / 2);
    }
  }

  draw() {
  // removes previous shape after each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.background.render(ctx);
    this.allBricks.render(ctx);
    this.ball.render(ctx);
    this.ball.moveTo();
    this.paddle.render(ctx);
    this.scoreText.render(ctx);
    this.livesText.render(ctx);
    this.collisionDetection();
    // touching left or right
    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius
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
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
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
          this.ball.x = this.canvas.width / 2;
          this.ball.y = canvas.height - 30;
          this.ball.dx = 3;
          this.ball.dy = -3;
          this.paddle.x = (canvas.width - this.paddle.width) / 2;
        }
      }
    }
    this.movePaddle();
    // fix this
    requestAnimationFrame(this.draw);
  }
}

export default Game;
