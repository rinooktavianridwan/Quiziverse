import React from "react";
import "./Bubble.css";

const Bubble = ({ size = 150, top = 0, left = 0, rotate = 0 }) => {
  return (
    <div
      className="bubble"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className="bubble-highlight"
        style={{
          top: `${size * 0.08}px`,
          left: `${size * 0.67}px`,
          height: `${size * 0.27}px`,
          width: `${size * 0.11}px`,
        }}
      ></div>
    </div>
  );
};

export default Bubble;
