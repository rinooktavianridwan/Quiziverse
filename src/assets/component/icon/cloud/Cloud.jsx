import React from "react";
import "./Cloud.css";
import useResponsiveSize from "../../../hooks/useResponsiveSize";

const Cloud = ({ width = 100, height = 60, top = 0, left = 0, rotate = 0 }) => {
  const adjustedWidth = useResponsiveSize(width);
  const adjustedHeight = useResponsiveSize(height);

  return (
    <div
      className="cloud"
      style={{
        width: `${adjustedWidth}px`,
        height: `${adjustedHeight}px`,
        top: `${top}%`,
        left: `${left}%`,
        position: "absolute",
      }}
    >
      <img
        src="/cloud.svg"
        alt="Cloud"
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
};

export default Cloud;
