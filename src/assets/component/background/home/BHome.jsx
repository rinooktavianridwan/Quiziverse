import React from "react";
import "./BHome.css";
import Bubble from "../../icon/bubble/buble";
import TwinklingStar from "../../icon/twinklingstar/TwinklingStar";
import Cloud from "../../icon/cloud/Cloud";

function BHome() {
  return (
    <div className="b-home-container">
      <TwinklingStar size={20} top={10} left={16} rotate={30} />
      <TwinklingStar size={25} top={25} left={8} rotate={30} />
      <TwinklingStar size={25} top={15} left={90} rotate={30} />
      <TwinklingStar size={20} top={58} left={50} rotate={30} />
      <TwinklingStar size={25} top={80} left={8} rotate={30} />
      <TwinklingStar size={25} top={70} left={90} rotate={30} />
      <TwinklingStar size={20} top={80} left={50} rotate={30} />
      <Cloud width={200} height={120} top={30} left={4} rotate={0} />
      <Cloud width={400} height={90} top={60} left={31} rotate={0} />
      <Cloud width={250} height={140} top={70} left={70} rotate={0} />
      <Cloud width={250} height={140} top={20} left={70} rotate={0} />
      <Bubble size={20} top={95} left={20} />
      <Bubble size={20} top={90} left={21} rotate={90}/>
      <Bubble size={20} top={85} left={25} rotate={90}/>
      <Bubble size={30} top={90} left={24} rotate={40}/>
      <Bubble size={60} top={80} left={18} rotate={70}/>
      <Bubble size={120} top={60} left={20} rotate={50}/>
      <Bubble size={200} top={8} left={90} rotate={100}/>
    </div>
  );
}

export default BHome;
