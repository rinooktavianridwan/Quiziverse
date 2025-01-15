import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isQuizPage = location.pathname.startsWith("/quiz/");

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("loggedInUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    fetchUser();
    const handleUserUpdate = () => fetchUser();
    window.addEventListener("userUpdate", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    const event = new Event("userUpdate");
    window.dispatchEvent(event);
    setUser(null);
    setDropdownVisible(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    !isQuizPage && (
      <nav className="navbar">
        <div className="logo">
          <Link to={"/"}>
            <img src="./quiziverse1.png" alt="logo" />
          </Link>
        </div>
        <ul className="destination">
          <li>
            <Link to={"/quiz"}>Quiz</Link>
          </li>
          {user ? (
            <li className="dropdown">
              <span className="username" onClick={toggleDropdown}>
                {user.username.length > 6
                  ? `${user.username.slice(0, 6)}..`
                  : user.username}
                ▼
              </span>
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    )
  );
}

export default Navbar;
