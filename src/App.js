import React, { Component } from "react";
import firebase from "firebase";
import Map from "./components/MapComponent";
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

function writeToDb(location, long, lat) {
  db.ref("location/" + location).set({
    location,
    long,
    lat
  });
}

db.ref("location/").on(
  "value",
  function(snapshot) {
    console.log(snapshot.val());
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Cameron Cam</h1>
        <Map />
      </div>
    );
  }
}

export default App;
