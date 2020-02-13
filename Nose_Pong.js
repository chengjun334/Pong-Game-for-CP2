
Nose_Pong
=== */
var x, y;
var vx, vy;
var leftPaddle;
var rightPaddle;
let video;
let poseNet;
let poses = [];
var leftScore = 0;
var rightScore = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  x = width / 2
  y = height / 2
  vx = 2
  vy = 1.2
  leftPaddle = height / 2
  rightPaddle = height / 2

  rectMode(CENTER);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  rect(20, leftPaddle, 10, 50);
  rect(width - 20, rightPaddle, 10, 50);

  ellipse(x, y, 20);

  push();
  noStroke();
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  text("Score", 50, 20);
  text(leftScore, 50 + 30, 20)

  text("score", width - 50, 20);
  text(rightScore, width - 50 + 30, 20)
  pop();


  x = x + vx;
  y = y + vy;

  if (y < 10) {
    vy = -vy;
  }
  if (y > height - 10) {
    vy = -vy;
  }
  if (x < 35) {
    if (y < leftPaddle + 25 && y > leftPaddle - 25) {
      vx = -vx;
    } else {
      rightScore = rightScore + 1
      x = width / 2
      y = height / 2
    }
  }
  if (x > width - 35) {
    if (y < rightPaddle + 25 && y > rightPaddle - 25) {
      vx = -vx;
    } else {
      leftScore = leftScore + 1
      x = width / 2
      y = height / 2
    }
  }


  for (i = 0; i < poses.length; i++) {
    if (poses.length >= 2) {

      if (poses[0].pose.nose.x < poses[1].pose.nose.x) {
        leftPaddle = poses[0].pose.nose.y;
        rightPaddle = poses[1].pose.nose.y;
      } else {
        leftPaddle = poses[1].pose.nose.y;
        rightPaddle = poses[0].pose.nose.y;
      }
    }
  }
}
