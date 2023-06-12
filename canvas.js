console.log('ya neeeerds');

// Function to generate random number
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 15, 15, 0.5)';
// c.fillRect(1, 1, 100, 100);
// c.fillStyle = 'rgba(0, 15, 255, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 15, 0.5)';
// c.fillRect(200, 200, 100, 100);
// c.fillRect(300, 300, 100, 100);
// c.fillRect(400, 400, 100, 100);

// console.log(canvas);

//line!
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(30, 200);
// c.strokeStyle = '#fa34a3';
// c.stroke();

//arcs make circles!
// c.beginPath();
// c.arc(350, 350, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

//for loop to make lots of circles!
// for (let i = 0; i < 666; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = `rgb(${randomNumber(0, 255)}, ${randomNumber(
//     0,
//     255
//   )}, ${randomNumber(0, 255)})`;
//   c.stroke();
// }

//hardcoded static random circle
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;

// let dx = Math.random() - 0.5 * 8;
// let dy = Math.random() - 0.5 * 8;

// let radius = 60;

// function Circle(x, y, dx, dy, radius) {
//   this.x = x;
//   this.y = y;
//   this.dx = dx;
//   this.dy = dy;
//   this.radius = radius;

//   this.draw = function () {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.strokeStyle = 'purple';
//     c.stroke();
//   };

//   this.update = function () {
//     if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//       this.dx = -this.dx;
//     }

//     if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//       this.dy = -this.dy;
//     }

//     this.x += this.dx;
//     this.y += this.dy;

//     this.draw();
//   };
// }

// let circleArray = [];

// for (let i = 0; i < 100; i++) {
//   let radius = randomNumber(1, 100);
//   let x = Math.random() * (innerWidth - radius * 2) + radius;
//   let y = Math.random() * (innerHeight - radius * 2) + radius;
//   let dx = Math.random() - 0.5 * randomNumber(1, 5);
//   let dy = Math.random() - 0.5 * randomNumber(1, 5);

//   circleArray.push(new Circle(x, y, dx, dy, radius));
// }

// function animate() {
//   //this function loops itself to repeatedly refresh
//   //the page with new coordinates for the shape
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, innerWidth, innerHeight);

//   for (let i = 0; i < circleArray.length; i++) {
//     circleArray[i].update();
//   }
// }

// animate();

function Balloon(centerX, centerY, dx, dy, radius, color) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius * 0.85;
  this.baseColor = color;
  this.dx = dx;
  this.dy = dy;

  let w_factor = 0.0333;
  let h_factor = 0.4;
  let curvature = (4 * (Math.sqrt(2) - 1)) / 3;

  let handleLength = curvature * radius; //Curvature = [(4 * (Math.sqrt(2) - 1)) / 3]
  let widthDiff = radius * w_factor; //width factor is a constant of 0.333 defined as global
  let heightDiff = radius * h_factor; //height factor is a constant of 0.4 defined as global -- Height will be larger than width to make it a Baloon else would become a circular balloon
  let balloonBottomY = centerY + radius + heightDiff; //Calculating the Bottom point of our Baloon by adding the centre Y, the Radies and the Height difference which was obtained from height factor

  this.draw = function () {
    c.beginPath();
    // Section to draw the Top Left Curve
    let topLeftCurveStartX = centerX - radius;
    let topLeftCurveStartY = centerY;
    let topLeftCurveEndX = centerX;
    let topLeftCurveEndY = centerY - radius;
    c.moveTo(topLeftCurveStartX, topLeftCurveStartY);
    c.bezierCurveTo(
      topLeftCurveStartX,
      topLeftCurveStartY - handleLength - widthDiff,
      topLeftCurveEndX - handleLength,
      topLeftCurveEndY,
      topLeftCurveEndX,
      topLeftCurveEndY
    ); // The 2 Control points are placed in a way to get a bigger arc on the top
    // Section to draw the Top Right Curve
    let topRightCurveStartX = centerX;
    let topRightCurveStartY = centerY - radius;
    let topRightCurveEndX = centerX + radius;
    let topRightCurveEndY = centerY;
    c.bezierCurveTo(
      topRightCurveStartX + handleLength + widthDiff,
      topRightCurveStartY,
      topRightCurveEndX,
      topRightCurveEndY - handleLength,
      topRightCurveEndX,
      topRightCurveEndY
    ); // The 2 Control points are placed in a way to get a bigger arc on the top
    // Section to draw the Bottom Right Curve
    let bottomRightCurveStartX = centerX + radius;
    let bottomRightCurveStartY = centerY;
    let bottomRightCurveEndX = centerX;
    let bottomRightCurveEndY = balloonBottomY;
    c.bezierCurveTo(
      bottomRightCurveStartX,
      bottomRightCurveStartY + handleLength,
      bottomRightCurveEndX + handleLength,
      bottomRightCurveEndY,
      bottomRightCurveEndX,
      bottomRightCurveEndY
    ); // The 2 Control points are placed in a way to get a a smaller curve at the bottom
    // Section to draw the Bottom Left Curve
    let bottomLeftCurveStartX = centerX;
    let bottomLeftCurveStartY = balloonBottomY;
    let bottomLeftCurveEndX = centerX - radius;
    let bottomLeftCurveEndY = centerY;
    c.bezierCurveTo(
      bottomLeftCurveStartX - handleLength,
      bottomLeftCurveStartY,
      bottomLeftCurveEndX,
      bottomLeftCurveEndY + handleLength,
      bottomLeftCurveEndX,
      bottomLeftCurveEndY
    ); // The 2 Control points are placed in a way to get a a smaller curve at the bottom
    c.fillStyle = this.baseColor;
    c.fill();
    // End balloon path
    // Create balloon tie
    let halfTieWidth = (radius * 0.12) / 2;
    let tieHeight = radius * 0.1;
    let tieCurveHeight = radius * 0.13;
    c.beginPath();
    c.moveTo(centerX - 1, balloonBottomY);
    c.lineTo(centerX - halfTieWidth, balloonBottomY + tieHeight);
    c.quadraticCurveTo(
      centerX,
      balloonBottomY + tieCurveHeight,
      centerX + halfTieWidth,
      balloonBottomY + tieHeight
    );
    c.lineTo(centerX + 1, balloonBottomY); // Quadratic Curve to make a slightly curved triangle at the bottom
    c.fill();
  };

  this.update = function () {
    if (centerX + radius > innerWidth || centerX - radius < 0) {
      dx = -dx;
    }

    if (centerY + radius > innerHeight || centerY - radius < 0) {
      dy = -dy;
    }

    centerX += dx;
    // centerY += dy;

    this.draw();
  };
}

// let balloon1 = new Balloon(100, 100, 85, 'red');
// balloon1.draw();

let balloonArray = [];

for (let i = 0; i < 99; i++) {
  let radius = randomNumber(1, 66);
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = Math.random() - 0.5 * randomNumber(1, 5);
  let dy = Math.random() - 0.5 * randomNumber(1, 5);

  balloonArray.push(new Balloon(x, y, dx, dy, radius, 'red'));
}

function animate() {
  //this function loops itself to repeatedly refresh
  //the page with new coordinates for the shape
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < balloonArray.length; i++) {
    balloonArray[i].update();
  }
}

animate();
