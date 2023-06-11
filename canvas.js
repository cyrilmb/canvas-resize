console.log('ya neeeerds');

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

c.fillStyle = 'rgba(255, 15, 15, 0.5)';
c.fillRect(1, 1, 100, 100);
c.fillStyle = 'rgba(0, 15, 255, 0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(0, 255, 15, 0.5)';
c.fillRect(200, 200, 100, 100);
c.fillRect(300, 300, 100, 100);
c.fillRect(400, 400, 100, 100);

console.log(canvas);

//line!
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(30, 200);
c.strokeStyle = '#fa34a3';
c.stroke();

//arcs make circles!
// c.beginPath();
// c.arc(350, 350, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

//for loop to make lots of circles!
for (let i = 0; i < 666; i++) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.strokeStyle = 'rgba';
  c.stroke();
}
