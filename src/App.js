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
  storageBucket: "gs://cameron-cam.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const db = firebase.database();
const storageRef = firebase.storage().ref("images");

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
    }
    return (
      <div className="App">
        <Header />
        <Map db={db} storage={storageRef} />
      </div>
    );
  };
  render() {
    return this.renderContent();
  }
}

export default App;
