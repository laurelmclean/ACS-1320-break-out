import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Text from './Text.js';
import Background from './Background.js';
import Bricks from './Bricks.js';

// reference canvas element in js
const canvas = document.getElementById('myCanvas');
// ctx variable to store the 2D rendering context
const ctx = canvas.getContext('2d');

const x = canvas.width / 2;
const y = canvas.height - 30;
const color = '#51a094';

// define ball radius to check if ball is touching wall
const ballRadius = 10;

// define paddle to hit the ball
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// define variables for pressed buttons with boolean values
// default value for both is false because at the beginning the control buttons are not pressed
let rightPressed = false;
let leftPressed = false;

// brick variables
const brickRowCount = 3;
const brickColumnCount = 5;

// score variables
const score = 0;

// give player lives
const lives = 3;

// new objects
const allBricks = new Bricks();
const background = new Background(0, 0, canvas.width, canvas.height)
const ball = new Ball(color, x, y);
const paddle = new Paddle(paddleX, canvas.height - 10);
const scoreText = new Text(8, 20, color, score, 'Score: ');
const livesText = new Text(canvas.width - 65, 20, color, lives, 'Lives: ');

// update the paddle position based on the pointer coordinates
function mouseMoveHandler({ clientX }) {
  // restricting the movement to the size of the Canvas
  // need to update so paddle wont disappear off left side
  const relativeX = clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.moveBy(relativeX - paddleWidth / 2);
  }
}

// when pressed
// browsers use arrowright or right
function keyDownHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = true;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = true;
  }
}

// when stopped being pressed
function keyUpHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = false;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = false;
  }
}

const { addEventListener } = document;
// event listeners to listen for pressed keys
addEventListener('keydown', keyDownHandler, false);
addEventListener('keyup', keyUpHandler, false);
// event listener for mouse
addEventListener('mousemove', mouseMoveHandler, false);

// paddle moving logic
function movePaddle() {
  // can move paddle only within boundaries of canvas
  if (rightPressed && paddle.x < canvas.width - paddleWidth) {
    paddle.moveTo(7);
  } else if (leftPressed && paddle.x > 0) {
    paddle.moveTo(-7);
  }
}

// collision detecting between ball and bricks
// loop through all the bricks and compare every single brick's position
// with the ball's coordinates as each frame is drawn
function collisionDetection() {
  for (let c = 0; c < allBricks.cols; c += 1) {
    for (let r = 0; r < allBricks.rows; r += 1) {
      // if the brick is active (its status is 1) we will check whether the collision happens;
      // if a collision does occur we'll set the status of the given brick to 0
      // so it won't be painted on the screen
      const b = allBricks.bricks[c][r];
      if (b.status === 1) {
        // if these conditions are met, reverse direction of ball
        if (
          ball.x > b.x
          && ball.x < b.x + allBricks.brickWidth
          && ball.y > b.y
          && ball.y < b.y + allBricks.brickHeight
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          // STRETCH CHALLENGE - ball changes color when hits brick
          ball.randColor();
          // increase score every time a collision occurs
          scoreText.value += 1;
          // if all bricks have been destroyed display winning message
          if (scoreText.value === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN! CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function draw() {
  // removes previous shape after each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  allBricks.render(ctx);
  ball.render(ctx);
  ball.moveTo();
  paddle.render(ctx);
  scoreText.render(ctx);
  livesText.render(ctx);
  collisionDetection();
  // touching left or right
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
    // random colour if ball touches left or right
    ball.randColor();
  }
  // if ball is touching top, reverse it
  // If the ball was moving upwards with a speed of 2 pixels per frame,
  // now it will be moving "up" with a speed of -2 pixels,
  // which actually equals to moving down at a speed of 2 pixels per frame.
  // else if ball touches bottom it will end game
  // or if ball touching bottom reverse it
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
    // update colour when collision with wall
    ball.randColor();
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    // detect collision between ball and paddle
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
      // update colour when collision with wall
      ball.randColor();
    } else {
      livesText.value -= 1;
      // if no lives, end game
      if (!livesText.value) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        // if there are still some lives left then the position of the ball and the paddle are reset
        // along with the movement of the ball.
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 3;
        ball.dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  movePaddle();
  requestAnimationFrame(draw);
}

draw();
