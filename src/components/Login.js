import React, { Component } from "react";
import "./styles/login.css";
export default class Login extends Component {
  state = {
    login: false,
    register: false
  };

  login = () => {
    this.setState({ login: !this.state.login, register: false });
  };

  register = () => {
    this.setState({ login: false, register: !this.state.register });
  };

  render() {
    const {
      currentUser,
      handleSignout,
      email,
      password,
      handleRegisterSubmit,
      handleLoginSubmit,
      handleInputChange
    } = this.props;
    const { login, register } = this.state;
    let renderLogin;

    if (currentUser) {
      renderLogin = <button onClick={handleSignout}>Logout</button>;
    } else {
      renderLogin = (
        <div className="auth-buttons">
          <button className="buttons login-button" onClick={this.login}>
            Login
          </button>
          <button className="buttons register-button" onClick={this.register}>
            Register
          </button>
          {/* Handles Registration */}
          {register && (
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
              />
              <button type="submit">Register</button>
            </form>
          )}
          {/* Handles Login Form */}
          {login && (
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
              />
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      );
    }

    return <div>{renderLogin}</div>;
  }
}
