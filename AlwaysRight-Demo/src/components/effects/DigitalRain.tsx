import React, { useEffect, useRef } from 'react';

const DigitalRain: React.FC<{ opacity?: number }> = ({ opacity = 0.15 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const columns = Math.floor(canvas.width / 15);
    const drops: number[] = new Array(columns).fill(0);
    
    const chars = '01ALWAYSRIGHT'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 16px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 15;
        const y = drops[i] * 20;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: opacity,
        pointerEvents: 'none'
      }}
    />
  );
};

export default DigitalRain; 