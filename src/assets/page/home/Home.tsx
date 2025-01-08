import React from "react";
import "./Home.css";
import BHome from "../../component/background/home/BHome";

function Home() {
  // Fungsi untuk mengecek data pengguna di localStorage
  const handleCheckUsers = () => {
    const users = JSON.parse(localStorage.getItem("QuizStorage") || "[]");
    console.log("Users in Local Storage:", users);
  };

  const handleChecLogin = () => {
    const users = JSON.parse(localStorage.getItem("loggedInUser") || "[]");
    console.log("Users in Local Storage:", users);
  };

  const handleClearLocalStorage = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      localStorage.clear();
      alert("All data has been cleared.");
    }
  };

  return (
    <div className="home-container">
      <BHome />
      <div className="home-actions">
        <button onClick={handleCheckUsers}>Check Users in Local Storage</button>
        <button onClick={handleClearLocalStorage}>
          Clear All Local Storage
        </button>
        <button onClick={handleChecLogin}>Check Users in Local Storage</button>
      </div>
    </div>
  );
}

export default Home;
