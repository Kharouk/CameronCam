import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cameron Cam</h1>
          <script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
          <script>
            // Initialize Firebase
            var config = {
              apiKey: "AIzaSyB4WkFwqGzI0mzyyIXPPG1jLP5gyi30FN8",
              authDomain: "cameron-cam.firebaseapp.com",
              databaseURL: "https://cameron-cam.firebaseio.com",
              projectId: "cameron-cam",
              storageBucket: "cameron-cam.appspot.com",
              messagingSenderId: "579457343374"
            };
            firebase.initializeApp(config);
            console.log(firebase)
          </script>
        </header>
      </div>
    );
  }
}

export default App;
