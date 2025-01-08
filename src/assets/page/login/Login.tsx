  import React, { useState } from "react";
  import "./Login.css";
  import { useNavigate } from "react-router-dom";
  import { addUser, loginUser } from "../../hooks/localHelper";

  function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
        const user = loginUser(email, password);
        setError(null);
        const event = new Event("userUpdate");
        window.dispatchEvent(event);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    };

    const handleSignup = (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
        addUser({ username, email, password, bestScore: 0 });
        setError(null);
        // Beri pesan sukses atau otomatis login
        alert("Signup successful! Please login.");
      } catch (err) {
        setError(err.message);
      }
    };

    return (
      <div className="form-container">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="login">
            <form className="form" onSubmit={handleLogin}>
              <label htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <div className="warning">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button>Login</button>
            </form>
          </div>

          <div className="signup">
            <form className="form" onSubmit={handleSignup}>
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <div className="warning">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <input
                type="text"
                name="username"
                placeholder="User name"
                required
              />
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default Login;
