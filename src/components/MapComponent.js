import React, { Component } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";

const cameron = require("./styles/images/pin.png");

let url = `https://maps.googleapis.com/maps/api/js?key=${
  process.env.REACT_APP_GOOGLE_API_KEY
}`;

const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      onClick={props.onMapClick}
      zoom={13}
      defaultCenter={{ lat: 51.52713, lng: -0.07806 }}
    >
      <Marker icon={cameron} position={props.marker} />
      {props.markers.map((marker, id) => {
        return <Marker icon={cameron} key={id} position={marker} />;
      })}
    </GoogleMap>
  ))
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: false,
      markers: [],
      saveButton: false,
      index: 0
    };
  }

  componentWillMount() {
    this.getIndex();
    this.props.db.ref("location/").on(
      "value",
      snapshot => {
        const result = snapshot.val();
        const markers = Object.keys(result).map(value => result[value]);
        this.setState({ markers });
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  getIndex = () => {
    this.props.db.ref("index/").on("value", snapshot => {
      const result = snapshot.val();
      console.log(result);
      this.setState({ index: result });
    });
  };

  hidesButtons = () => {
    this.setState({ saveButton: false });
  };

  saveCoordinates = event => {
    this.setState({
      marker: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      saveButton: true
    });
  };

  saveToDatabase = () => {
    this.props.db.ref("index/").set(this.state.index + 1);
    this.props.db.ref("location/" + this.state.index).set(this.state.marker);
  };

  render() {
    return (
      <div>
        {this.state.saveButton && (
          <>
            <button
              style={{
                color: "rgb(63, 130, 195)",
                fontSize: "30px",
                border: "2px solid rgb(63, 130, 195)",
                padding: "10px",
                margin: "20px"
              }}
              onClick={this.saveToDatabase}
            >
              Save
            </button>
            <button
              style={{
                color: "rgb(63, 130, 195)",
                fontSize: "30px",
                border: "2px solid rgb(63, 130, 195)",
                padding: "10px",
                margin: "20px"
              }}
              onClick={this.hidesButtons}
            >
              Cancel
            </button>
          </>
        )}
        <MapComponent
          lat={51.52713}
          lng={-0.07806}
          marker={this.state.marker}
          markers={this.state.markers}
          onMapClick={e => this.saveCoordinates(e)}
          googleMapURL={url}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `650px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
