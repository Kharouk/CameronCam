import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/storage";
import Map from "./components/MapComponent";
import Login from "./components/Login";
import Header from "./components/Header";
import About from "./components/About";
// backend content:
import * as contentful from "contentful";

import "./App.css";

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

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

  componentDidMount() {
    setTimeout(() => {
      if (firebase.auth().currentUser) {
        this.setState({ isUserLoggedIn: true });
      }
    }, 1000);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRegisterSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ isUserLoggedIn: true });
      })
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
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
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
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
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
      });
  };

  handleTwitterSubmit = e => {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ isUserLoggedIn: true });
      })
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
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
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
      });
  };

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ isUserLoggedIn: false });
      })
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
      });
  };

  renderContent = () => {
    return (
      <div className="App">
        <Header location={this.state.location} />
        {!firebase.auth().currentUser && (
          <h1 className="sign-in-header">
            To report your sightings, sign in or{" "}
            <a
              href="mailto:wherescameron@gmail.com?Subject=I%20have%20seen%20David"
              target="_top"
              className="email--link"
            >
              email us!
            </a>
          </h1>
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
          error={this.state.error}
        />
        <Map db={db} storage={storageRef} user={firebase.auth().currentUser} />
        <About contentful={client} />
      </div>
    );
  };
  render() {
    return this.renderContent();
  }
}

export default App;
