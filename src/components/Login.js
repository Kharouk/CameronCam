import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "./styles/login.css";
import "./styles/privacy.css";

library.add(fab);

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

  icons = () => {
    const {
      handleFacebookSubmit,
      handleTwitterSubmit,
      handleGoogleSubmit
    } = this.props;
    return (
      <div className="auth--icons">
        <FontAwesomeIcon
          onClick={handleGoogleSubmit}
          icon={["fab", "google"]}
          size="lg"
          className="auth--button"
        />
        <FontAwesomeIcon
          onClick={handleFacebookSubmit}
          icon={["fab", "facebook"]}
          size="lg"
          className="auth--button"
        />
        <FontAwesomeIcon
          onClick={handleTwitterSubmit}
          icon={["fab", "twitter"]}
          size="lg"
          className="auth--button"
        />
        <br />
        <p>--- OR ---</p>
      </div>
    );
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
      renderLogin = (
        <button className="logout--button" onClick={handleSignout}>
          Logout
        </button>
      );
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
            <>
              {this.icons()}
              <form onSubmit={handleRegisterSubmit} className="register--form">
                <label htmlFor="email">What is your email?</label>
                <input
                  type="text"
                  name="email"
                  className="input__fields"
                  placeholder="Email"
                  value={email}
                  autoComplete
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Choose a password</label>
                <input
                  type="password"
                  name="password"
                  className="input__fields"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                />
                <button className="submit--button buttons" type="submit">
                  Register
                </button>
                <div className="privacy-link">
                  <a href="https://privacypolicygenerator.info/live.php?token=Jj0CK3AyKQnr2pH5W28zpei9MiCUIBzI">link to privacy policy</a>
                </div>
              </form>
            </>
          )}
          {/* Handles Login Form */}
          {login && (
            <>
              {this.icons()}
              <form onSubmit={handleLoginSubmit} className="login--form">
                <label htmlFor="email">What is your email?</label>
                <input
                  type="text"
                  name="email"
                  className="input__fields"
                  placeholder="Email"
                  value={email}
                  autoComplete
                  onChange={handleInputChange}
                />
                <label htmlFor="email">What is your password?</label>
                <input
                  type="password"
                  name="password"
                  className="input__fields"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                />
                <button className="submit--button buttons" type="submit">
                  Login
                </button>
                <div className="privacy-link">
                  <a href="#privacy-policy" id="cameron-about">link to privacy policy</a>
                </div>
              </form>
            </>
          )}
        </div>
      );
    }

    return <div className="logout--body">{renderLogin}</div>;
  }
}
