// reference canvas element in js
const canvas = document.getElementById('myCanvas');
// ctx variable to store the 2D rendering context
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let color = '#51a094';

// STRETCH CHALLENGE
// change ball to random colour every time it bounces off wall
function randColor() {
  return (`#${(Math.floor(Math.random() * 0x1000000) + 0x1000000).toString(16).substring(1)}`
  );
}

// define ball radius to check if ball is touching wall
const ballRadius = 10;

// define paddle to hit the ball
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// define variables for pressed buttons with boolean values
// default value for both is false because at the beginning the control buttons are not pressed
let rightPressed = false;
let leftPressed = false;

// brick variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// array containing columns, rows, and x and y position
// code will loop through and create new bricks
const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// score variables
let score = 0;

// give player lives
let lives = 3;

// update the paddle position based on the pointer coordinates
function mouseMoveHandler(e) {
  // restricting the movement to the size of the Canvas
  // need to update so paddle wont disappear off left side
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// when pressed
// browsers use arrowright or right
function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

// when stopped being pressed
function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

// event listeners to listen for pressed keys
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
// event listener for mouse
document.addEventListener('mousemove', mouseMoveHandler, false);

// brick drawing logic
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        // calculations that will work out the x & y position of each brick for each loop iteration
        // brickX position is worked out as brickWidth & brickPadding
        // multiplied by the column number, c, plus the brickOffsetLeft
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        // Stretch challenge - rows are different colours
        let brickRowColor = '#133337';
        if (r === 1) {
          brickRowColor = '#0e2f44';
        } else if (r === 2) {
          brickRowColor = '#2a6f64';
        }
        ctx.fillStyle = brickRowColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// collision detecting between ball and bricks
// loop through all the bricks and compare every single brick's position
// with the ball's coordinates as each frame is drawn
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      // if the brick is active (its status is 1) we will check whether the collision happens;
      // if a collision does occur we'll set the status of the given brick to 0
      // so it won't be painted on the screen
      if (b.status === 1) {
        // if these conditions are met, reverse direction of ball
        if (
          x > b.x
                            && x < b.x + brickWidth
                            && y > b.y
                            && y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          // STRETCH CHALLENGE - ball changes color when hits brick
          color = randColor();
          // increase score every time a collision occurs
          score += 1;
          // if all bricks have been destroyed display winning message
          if (score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN! CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// function to create an update score display
function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#51a094';
  // first param is text, and then coordinates
  ctx.fillText(`Score: ${score}`, 8, 20);
}

// draw lives
function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#51a094';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

// The draw() function will be executed within setInterval every 10 milliseconds
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#51a094';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // removes previous shape after each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  // touching left or right
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    // random colour if ball touches left or right
    color = randColor();
  }
  // if ball is touching top, reverse it
  // If the ball was moving upwards with a speed of 2 pixels per frame,
  // now it will be moving "up" with a speed of -2 pixels,
  // which actually equals to moving down at a speed of 2 pixels per frame.
  // else if ball touches bottom it will end game
  // or if ball touching bottom reverse it
  if (y + dy < ballRadius) {
    dy = -dy;
    // update colour when collision with wall
    color = randColor();
  } else if (y + dy > canvas.height - ballRadius) {
    // detect collision between ball and paddle
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      // update colour when collision with wall
      color = randColor();
    } else {
      lives -= 1;
      // if no lives, end game
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        // if there are still some lives left then the position of the ball and the paddle are reset
        // along with the movement of the ball.
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  // paddle moving logic
  // can move paddle only within boundaries of canvas
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  // add a small value to x and y after every frame has been drawn to make it appear
  // that the ball is moving
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
