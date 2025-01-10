import React from 'react';
import './Button.css';

const Button = ({ text, onClick, fontSize = '1.2rem', fontWeight = '600' }) => {
  return (
    <button
      className="btn-primary"
      onClick={onClick}
      style={{ fontSize: fontSize, fontWeight: fontWeight }}
    >
      {text}
    </button>
  );
};

export default Button;
