import React, { useEffect, useRef } from 'react';

const HorizontalDigitalStream: React.FC<{ opacity?: number }> = ({ opacity = 0.1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const rows = Math.floor(canvas.height / 20);
    const streams: number[] = new Array(rows).fill(canvas.width);
    
    const chars = '01ALWAYSRIGHT'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // 蓝色
      ctx.font = 'bold 14px monospace';

      for (let i = 0; i < streams.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = i * 20;

        // 每行多个字符
        for (let x = streams[i]; x < canvas.width; x += 20) {
          if (Math.random() > 0.98) {
            ctx.fillText(text, x, y);
          }
        }

        streams[i] -= 2; // 向左移动

        if (streams[i] < 0) {
          streams[i] = canvas.width;
        }
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: opacity,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default HorizontalDigitalStream; 