import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/storage";
import Map from "./components/MapComponent";
import Login from "./components/Login";
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
  state = {
    email: "",
    password: "",
    error: null,
    isUserLoggedIn: false
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        // console.log(user);
      });
  };

  handleSignout = () => {
    firebase.auth().signOut();
  };

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
        {!firebase.auth().currentUser && (
          <Login
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            handleSignout={this.handleSignout}
          />
        )}
        {firebase.auth().currentUser && (
          <button onClick={this.handleSignout}>Logout</button>
        )}
        <Header />
        <Map db={db} storage={storageRef} user={firebase.auth().currentUser} />
      </div>
    );
  };
  render() {
    return this.renderContent();
  }
}

export default App;
