import React from "react";
import "./Home.css";
import BHome from "../../component/background/home/BHome";
import Button from "../../component/icon/button/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/quiz");
  };

  return (
    <>
      <div className="home-container">
        <BHome />
        <img src="./quiziverse1.png" alt="quiziverse" />
        <p>Explore the world of knowledge</p>
        <Button
          text="Start"
          onClick={handleClick}
          fontSize="2rem"
          fontWeight="800"
        />
      </div>
    </>
  );
}

export default Home;
