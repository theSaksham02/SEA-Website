import React from 'react';
import seaLogo from '../assets/sea-logo.jpg';

const Logo = () => {
  return (
    <div style={{ width: '40px', height: '40px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={seaLogo}
        alt="SEA Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 10px rgba(139, 0, 0, 0.3))'
        }}
      />
    </div>
  );
};

export default Logo;
