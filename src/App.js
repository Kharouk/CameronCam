import React, { Component } from "react";
import firebase from "firebase";
import Map from "./components/MapComponent";
import Header from "./components/Header";
import { isMobile } from "react-device-detect";
import "./App.css";

let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "cameron-cam",
  storageBucket: "cameron-cam.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const db = firebase.database();

class App extends Component {
  renderContent = () => {
    if (isMobile) {
      return (
        <div>
          <h5 style={{ textAlign: "center" }}>
            Please view this page on desktop
          </h5>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header />
          <Map db={db} />
        </div>
      );
    }
  };
  render() {
    return this.renderContent();
  }
}

export default App;
