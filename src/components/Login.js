import React, { Component } from "react";

export default class Login extends Component {
  render() {
    const { email, password, error } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.props.handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.props.handleInputChange}
          />
          <button type="submit">Login/Register</button>
        </form>
      </div>
    );
  }
}
