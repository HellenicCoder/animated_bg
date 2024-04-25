const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];

function spawnParticles() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const radius = Math.random() * 10 + 1;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const dx = (Math.random() - 0.5) * 5;
  const dy = (Math.random() - 0.5) * 5;

  particles.push({x, y, dx, dy, radius, color});
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.x += particle.dx;
    particle.y += particle.dy;

    if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
      particle.dx = -particle.dx;
    }

    if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
      particle.dy = -particle.dy;
    }

    particle.radius -= 0.05;

    if (particle.radius <= 0) {
      particles.splice(index, 1);
    } else {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    }
  });
}

setInterval(spawnParticles, 100);
animate();
