import React, { Component } from "react";
import "./styles/header.css";
const cameronTogether = require("./styles/images/all_together.gif");
const logo = require("./styles/images/logo_CC.png");

export default class Header extends Component {
  render() {
    return (
      <div className="body" id="header-main">
        <img id="cameron-logo" src={logo} alt="camLogo" />
        <img
          id="cameron-pin"
          src={cameronTogether}
          alt="David Cameron, A Patriot"
        />
        <div>
          <p className="about-header">
            <a href="#about-us" id="cameron-about">
              about the project
            </a>
          </p>
        </div>
      </div>
    );
  }
}
