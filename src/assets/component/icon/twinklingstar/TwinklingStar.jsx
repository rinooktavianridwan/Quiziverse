import React from "react";
import "./TwinklingStar.css";
import useResponsiveSize from "../../../hooks/useResponsiveSize";

const TwinklingStar = ({ size = 50, top = 0, left = 0, rotate = 0 }) => {
  const adjustedSize = useResponsiveSize(size);

  return (
    <div
      className="twinkling-curved-star"
      style={{
        width: `${adjustedSize}px`,
        height: `${adjustedSize}px`,
        top: `${top}%`,
        left: `${left}%`,
        position: "absolute",
      }}
    >
      <img
        src="/star.svg"
        alt="Star"
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

export default TwinklingStar;
