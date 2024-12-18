// Digital Clock
function updateDigitalClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('digitalClock').textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateDigitalClock, 1000);
  
  // Analog Clock
  const canvas = document.getElementById('analogClock');
  const ctx = canvas.getContext('2d');
  const radius = canvas.height / 2;
  ctx.translate(radius, radius);
  
  function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }
  
  function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
  }
  
  function drawNumbers(ctx, radius) {
    ctx.font = `${radius * 0.15}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (let num = 1; num <= 12; num++) {
      const ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }
  
  function drawTime(ctx, radius) {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
  
    // Hour hand
    const hourAngle = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60));
    drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07);
  
    // Minute hand
    const minuteAngle = (minute * Math.PI / 30);
    drawHand(ctx, minuteAngle, radius * 0.8, radius * 0.07);
  
    // Second hand
    const secondAngle = (second * Math.PI / 30);
    drawHand(ctx, secondAngle, radius * 0.9, radius * 0.02, 'red');
  }
  
  function drawHand(ctx, pos, length, width, color = 'black') {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
  
  setInterval(drawClock, 1000);
  