import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/storage";
import Map from "./components/MapComponent";
import Login from "./components/Login";
import Header from "./components/Header";
import About from "./components/About";
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
    username: "",
    password: "",
    error: null,
    isUserLoggedIn: false
  };

  componentDidMount() {
    setTimeout(() => {
      if (firebase.auth().currentUser) {
        this.setState({ isUserLoggedIn: true });
        firebase.auth().currentUser.likedMarkers = [];
      }
    }, 2000);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRegisterSubmit = event => {
    event.preventDefault();
    const { email, password, username } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: username
        });
      })
      .then(user => {
        this.setState({ isUserLoggedIn: true });
      });
  };

  handleGoogleSubmit = e => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var user = result.user;
        this.setState({ isUserLoggedIn: true });
      })
      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  handleFacebookSubmit = e => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.setState({ isUserLoggedIn: true });
      })
      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  handleTwitterSubmit = e => {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ isUserLoggedIn: true });
      });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ isUserLoggedIn: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ isUserLoggedIn: false });
      });
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
        <Header location={this.state.location} />
        {!firebase.auth().currentUser && (
          <h1 className="sign-in-header">Sign in to report your sightings!</h1>
        )}
        <Login
          handleInputChange={this.handleInputChange}
          handleRegisterSubmit={this.handleRegisterSubmit}
          handleLoginSubmit={this.handleLoginSubmit}
          handleSignout={this.handleSignout}
          currentUser={firebase.auth().currentUser}
          handleGoogleSubmit={this.handleGoogleSubmit}
          handleFacebookSubmit={this.handleFacebookSubmit}
          handleTwitterSubmit={this.handleTwitterSubmit}
        />
        <Map db={db} storage={storageRef} user={firebase.auth().currentUser} />
        <About />
      </div>
    );
  };
  render() {
    return this.renderContent();
  }
}

export default App;
