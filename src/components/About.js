import React, { Component } from "react";
import "./styles/about.css";
export default class About extends Component {
  render() {
    return (
      <>
        <div className="about-body">
          <p className="main-txt">
            The Tories were members of two political parties which
            existed sequentially in the Kingdom of England, the
            Kingdom of Great Britain and later the United Kingdom of
            Great Britain and Ireland from the 17th to the early 19th
            centuries. The first Tories emerged in 1678 in England,
            when they opposed the Whig-supported Exclusion Bill which
            set out to disinherit the heir presumptive James, Duke of York,
            who eventually became James II of England and VII of Scotland.
          </p>
          <div className="contact-us" >
            <p>
              If you want to reach us:
            </p>
            <p>
              07 4644 48 48 34
            </p>
            <p>
              wherescameron@gmail.com
            </p>
          </div>
        </div>
      </>
    )
  }
}