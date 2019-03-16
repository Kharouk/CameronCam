import React from "react";
import "./styles/navigation.css";

const Navigation = props => {
  const css = props.location === 1 ? "dotstyle-selected" : "";
  return (
    <div className="dotstyle dotstyle-fillup">
      <ul>
        <li>
          <a className="css" href="#main">
            Main
          </a>
        </li>
        <li>
          <a href="#map">Map</a>
        </li>
        <li>
          <a href="#about-us">About</a>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
