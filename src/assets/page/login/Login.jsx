import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const { handleLogin, handleSignup, error } = useAuth();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogin(email, password);
  };

  const onSignupSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleSignup(username, email, password);
  };

  return (
    <div className="form-container">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form className="form" onSubmit={onLoginSubmit}>
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
          <form className="form" onSubmit={onSignupSubmit}>
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
