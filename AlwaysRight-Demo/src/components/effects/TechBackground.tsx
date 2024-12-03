import React from 'react';
import { Box } from '@mui/material';

const TechBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        opacity: 0.05,
        pointerEvents: 'none',
        background: `
          linear-gradient(90deg, #000 21px, transparent 1%) center,
          linear-gradient(#000 21px, transparent 1%) center,
          #3b82f6
        `,
        backgroundSize: '22px 22px',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
          `,
          animation: 'pulse 10s ease-in-out infinite'
        },
        '@keyframes pulse': {
          '0%': { opacity: 0.5 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.5 }
        }
      }}
    />
  );
};

export default TechBackground; 