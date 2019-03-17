import React, { Component } from "react";

export default class Login extends Component {
  state = {
    login: false,
    register: false
  };

  login = () => {
    this.setState({ login: true, register: false });
  };

  register = () => {
    this.setState({ login: false, register: true });
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

    let renderLogin;

    if (currentUser) {
      renderLogin = <button onClick={handleSignout}>Logout</button>;
    } else {
      renderLogin = (
        <div>
          <button onClick={this.login}>Login</button>
          <button onClick={this.register}>Register</button>
          {this.state.register && (
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
          {this.state.login && (
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
