import React from "react";
import "./TwinklingStar.css";

const TwinklingStar = ({ size = 50, top = 0, left = 0, rotate = 0 }) => {
  return (
    <div
      className="twinkling-curved-star"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
        position: "absolute",
        transform: `rotate(${rotate}deg)`,
        backgroundImage: `url(/star.svg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

export default TwinklingStar;
