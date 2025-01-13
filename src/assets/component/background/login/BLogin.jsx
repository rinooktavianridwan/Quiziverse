import React from "react";
import "./BLogin.css";
import Bubble from "../../icon/bubble/buble";
import TwinklingStar from "../../icon/twinklingstar/TwinklingStar";
import Cloud from "../../icon/cloud/Cloud";

function BLogin() {
  return <div className="b-login-container">
    <TwinklingStar size={20} top={10} left={16} rotate={30} />
      <TwinklingStar size={25} top={8} left={4} rotate={50} />
      <TwinklingStar size={25} top={30} left={10} rotate={70} />

      <TwinklingStar size={20} top={58} left={2} rotate={30} />
      <TwinklingStar size={25} top={80} left={8} rotate={30} />

      <TwinklingStar size={25} top={5} left={50} rotate={30} />
      <TwinklingStar size={25} top={5} left={70} rotate={30} />
      <TwinklingStar size={20} top={8} left={30} rotate={30} />

      <TwinklingStar size={20} top={10} left={98} rotate={30} />
      <TwinklingStar size={25} top={70} left={90} rotate={30} />

      <Cloud width={200} height={120} top={15} left={-1} rotate={0} />
      <Cloud width={250} height={140} top={70} left={90} rotate={0} />
      <Cloud width={250} height={140} top={20} left={75} rotate={0} />
      <Cloud width={250} height={140} top={80} left={4} rotate={0} />
      <Cloud width={250} height={140} top={78} left={28} rotate={0} />
      <Cloud width={250} height={140} top={84} left={68} rotate={0} />

      <Bubble size={100} top={65} left={2} rotate={50}/>
      <Bubble size={120} top={30} left={6} rotate={180}/>
      <Bubble size={200} top={8} left={90} rotate={100}/>
      <Bubble size={180} top={48} left={52} rotate={100}/>
  </div>;
}

export default BLogin;
