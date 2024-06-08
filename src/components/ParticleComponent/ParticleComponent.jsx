import React, { useEffect, useRef } from 'react';
import './particle.css';

const ParticleComponent = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ROWS = 100;
    const COLS = 350;
    const NUM_PARTICLES = ROWS * COLS;
    const THICKNESS = Math.pow(80, 2);
    const MARGIN = 0;
    const COLORS = ['#ff0000', '#00ff00', '#0000ff']; // Red, Green, Blue
    const DRAG = 0.95;
    const EASE = 0.25;

    let particle, canvas, ctx, mx, my, d, f, i, w, h, p;
    const particles = [];

    particle = {
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    const init = () => {
      canvas = canvasRef.current;
      ctx = canvas.getContext('2d');
      const SPACING = window.innerWidth / COLS;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      containerRef.current.style.marginTop = Math.round(h * -0.5) + 'px';

      for (i = 0; i < NUM_PARTICLES; i++) {
        p = Object.create(particle);
        p.x = p.ox = MARGIN + SPACING * (i % COLS);
        p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);
        particles[i] = p;
      }

      if (containerRef.current) {
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseout', handleMouseOut);
      }
    };

    const handleMouseMove = (e) => {
      const bounds = canvas.getBoundingClientRect();
      mx = e.clientX - bounds.left;
      my = e.clientY - bounds.top;
    };

    const handleMouseOut = () => {
      mx = null;
      my = null;
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (i = 0; i < NUM_PARTICLES; i++) {
        p = particles[i];
        if (mx !== null && my !== null) {
          d = (mx - p.x) * (mx - p.x) + (my - p.y) * (my - p.y);
          f = -THICKNESS / d;

          if (d < THICKNESS) {
            const t = Math.atan2(my - p.y, mx - p.x);
            p.vx += f * Math.cos(t);
            p.vy += f * Math.sin(t);
          }
        }

        p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
        p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 1, 1);
      }

      requestAnimationFrame(step);
    };

    init();
    step();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, []);

  return (
    <div id="container" ref={containerRef} style={{ width: '100%', overflow:"hidden"}}>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
};

export default ParticleComponent;
