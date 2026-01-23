import React from 'react';

const Card = ({ children, className = '', padding = 'p-6' }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-3xl ${padding} border border-white/10 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
