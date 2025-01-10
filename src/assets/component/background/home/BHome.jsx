import React from "react";
import "./BHome.css";
import Bubble from "../../icon/bubble/buble";
import TwinklingStar from "../../icon/twinklingstar/TwinklingStar";

function BHome() {
  return (
    <div className="b-home-container">
      <Bubble size={100} top={50} left={100} />
      <Bubble size={150} top={200} left={300} />
      <Bubble size={200} top={400} left={500} rotate={80}/>
      <TwinklingStar size={20} top={400} left={500} rotate={90} />
    </div>
  );
}

export default BHome;
