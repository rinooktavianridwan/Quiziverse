import React from "react";
import "./Home.css";
import BHome from "../../component/background/home/BHome";
import Button from "../../component/icon/button/Button";

function Home() {
  // Fungsi untuk mencetak nama-nama localStorage dan jumlahnya
  const handlePrintLocalStorageKeys = () => {
    const keys = Object.keys(localStorage); // Mendapatkan semua nama key di localStorage
    console.log("LocalStorage Keys:", keys);
    console.log("Total Keys in LocalStorage:", keys.length);
  };

  const handleCheckUsers = () => {
    const users = JSON.parse(localStorage.getItem("QuizStorage") || "[]");
    console.log("Users in Local Storage:", users);
  };

  const handleChecLogin = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "[]");
    console.log("Logged In User:", loggedInUser);
  };

  const handleClearLocalStorage = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      localStorage.clear();
      alert("All data has been cleared.");
    }
  };
  const handleClick = () => {
  };

  return (
    <div className="home-container">
      <BHome />
        <button onClick={handleCheckUsers}>Check Users in Local Storage</button>
        <button onClick={handleClearLocalStorage}>
          Clear All Local Storage
        </button>
        <button onClick={handleChecLogin}>Check Logged In User</button>
        <button onClick={handlePrintLocalStorageKeys}>
          Print LocalStorage Keys and Count
        </button>
        <Button text="Start" onClick={handleClick} fontSize="2rem" fontWeight="800"/>
    </div>
  );
}

export default Home;
