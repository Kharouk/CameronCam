import React from "react";
import "./styles/navigation.css";

const Navigation = props => {
  return (
    <div class="dotstyle dotstyle-fillup">
      <ul>
        <li>
          <a className={props.main ? "dotstyle-selected" : ""} href="#main">
            Main
          </a>
        </li>
        <li>
          <a className={props.map ? "dotstyle-selected" : ""} href="#map">
            Map
          </a>
        </li>
        <li>
          <a
            className={props.about ? "dotstyle-selected" : ""}
            href="#about-us"
          >
            About
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
