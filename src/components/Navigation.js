import React from "react";
import "./styles/navigation.css";

const Navigation = props => {
  return (
    <div className="dotstyle dotstyle-fillup">
      <ul>
        <li>
          <a
            className={props.location === 1 ? "dotstyle-selected" : ""}
            href="#main"
          >
            Main
          </a>
        </li>
        <li>
          <a
            className={props.location === 2 ? "dotstyle-selected" : ""}
            href="#map"
          >
            Map
          </a>
        </li>
        <li>
          <a
            className={props.location === 3 ? "dotstyle-selected" : ""}
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
