let balls = [];
let maxBalls = 5;
let ballSize = 50;

function setup() {
  createCanvas(400, 400);
  createBall();
}

function createBall() {
  let ball = {
    x: width / 2,
    y: height / 2,
    speedX: random(1, 3),
    speedY: random(1, 3),
    squashFactorX: 1,
    squashFactorY: 1,
    squashChangeSpeed: 0.05,
  };
  balls.push(ball);
}

function draw() {
  background(220);

  for (let ball of balls) {
    ball.speedX += random(-0.1, 0.1);
    ball.speedY += random(-0.1, 0.1);

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x > width - ballSize / 2 || ball.x < ballSize / 2) {
      ball.speedX *= -1;
      ball.squashFactorX = 0.5;
      ball.squashFactorY = 1;
      createBall(); 
    }
    if (ball.y > height - ballSize / 2 || ball.y < ballSize / 2) {
      ball.speedY *= -1;
      ball.squashFactorY = 0.5;
      ball.squashFactorX = 1;
      createBall();
    }

    ball.speedX = constrain(ball.speedX, -3, 3);
    ball.speedY = constrain(ball.speedY, -3, 3);

    ellipse(ball.x, ball.y, ballSize * ball.squashFactorX, ballSize * ball.squashFactorY);

    ball.squashFactorX = lerp(ball.squashFactorX, 1, ball.squashChangeSpeed);
    ball.squashFactorY = lerp(ball.squashFactorY, 1, ball.squashChangeSpeed);
  }

  balls = balls.filter(ball => ball.x >= -ballSize / 2 && ball.x <= width + ballSize / 2 && ball.y >= -ballSize / 2 && ball.y <= height + ballSize / 2);
  
}