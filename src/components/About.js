import React, { Component } from "react";
import "./styles/about.css";
const logo = require("./styles/images/logo_CC.png");

export default class About extends Component {
  state = {
    aboutContent: {}
  };

  componentDidMount() {
    this.props.contentful.getEntry("2l2nwyNOCV12LsX8ix7MBq").then(about => {
      this.setState({ aboutContent: about.toPlainObject() });
    });
  }

  createHtml = content => {
    return { __html: content };
  };

  render() {
    const { aboutContent } = this.state;
    return (
      <>
        {aboutContent.fields && (
          <div className="about-body" id="about-us">
            <div className="about--left">
              <img id="about-logo" src={logo} alt="camLogo" />
              <p
                className="createdby__text"
                dangerouslySetInnerHTML={this.createHtml(
                  aboutContent.fields.createdBy
                )}
              />
            </div>
            <div id="text">
              <p
                className="main-txt"
                dangerouslySetInnerHTML={this.createHtml(
                  aboutContent.fields.about
                )}
              />

              <p
                className="contact-us"
                dangerouslySetInnerHTML={this.createHtml(
                  aboutContent.fields.contact
                )}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}
