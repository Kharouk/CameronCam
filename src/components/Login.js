import React, { Component } from "react";

export default class Login extends Component {
  render() {
    const {
      currentUser,
      handleSignout,
      email,
      password,
      handleSubmit,
      handleInputChange
    } = this.props;

    let renderLogin;

    if (currentUser) {
      renderLogin = <button onClick={handleSignout}>Logout</button>;
    } else {
      renderLogin = (
        <div>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login/Register</button>
          </form>
        </div>
      );
    }

    return <div>{renderLogin}</div>;
  }
}
