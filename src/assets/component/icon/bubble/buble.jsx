import React from "react";
import "./Bubble.css";
import useResponsiveSize from "../../../hooks/useResponsiveSize";

const Bubble = ({ size = 150, top = 0, left = 0, rotate = 0 }) => {
  const adjustedSize = useResponsiveSize(size);

  return (
    <div
      className="bubble"
      style={{
        height: `${adjustedSize}px`,
        width: `${adjustedSize}px`,
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className="bubble-highlight"
        style={{
          top: `${adjustedSize * 0.08}px`,
          left: `${adjustedSize * 0.67}px`,
          height: `${adjustedSize * 0.27}px`,
          width: `${adjustedSize * 0.11}px`,
        }}
      ></div>
    </div>
  );
};

export default Bubble;
