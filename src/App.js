import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";

require("dotenv").config();

let config = {
  apiKey: process.env.firebaseAPI,
  authDomain: process.env.authDomain,
  databaseURL: "https://cameron-cam.firebaseio.com",
  projectId: "cameron-cam",
  storageBucket: "cameron-cam.appspot.com",
  messagingSenderId: process.env.messagingSenderId
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

writeToDb("london", 52, -23);
writeToDb("paris", 52, -23);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cameron Cam</h1>
        </header>
      </div>
    );
  }
}

export default App;
