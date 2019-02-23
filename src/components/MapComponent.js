import React, { Component } from "react";
import Button from "./Button";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
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
      <Marker icon={cameron} position={props.marker}>
        {props.isOpen && (
          <InfoWindow onCloseClick={props.closeSave}>
            <Button isSaveButton={true} saveToDatabase={props.saveToDatabase} />
          </InfoWindow>
        )}
      </Marker>
      {props.markers.map((marker, index) => {
        return (
          <Marker
            icon={cameron}
            key={marker.id}
            position={marker}
            onClick={() => props.markerHandleClick(index)}
          >
            {props.markerWindowIndex === index && (
              <InfoWindow onCloseClick={props.closeSave}>
                <Button
                  isSaveButton={false}
                  deleteFromDatabase={() => props.deleteFromDatabase(marker)}
                />
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  ))
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: false,
      markerWindowIndex: 0,
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

  deleteFromDatabase = marker => {
    this.props.db.ref("location/" + marker.id).set(null);
  };

  markerHandleClick = num => {
    this.setState({ markerWindowIndex: num });
  };

  getIndex = () => {
    this.props.db.ref("index/").on("value", snapshot => {
      const result = snapshot.val();
      console.log(result);
      this.setState({ index: result });
    });
  };

  hideButtons = () => {
    this.setState({ saveButton: false });
  };

  saveCoordinates = event => {
    this.setState({
      marker: {
        id: this.state.index,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      saveButton: true
    });
  };

  saveToDatabase = () => {
    this.props.db.ref("index/").set(this.state.index + 1);
    this.props.db.ref("location/" + this.state.index).set(this.state.marker);
    this.hideButtons();
  };

  render() {
    return (
      <div>
        <MapComponent
          lat={51.52713}
          lng={-0.07806}
          marker={this.state.marker}
          markers={this.state.markers}
          markerHandleClick={this.markerHandleClick}
          onMapClick={e => this.saveCoordinates(e)}
          saveToDatabase={this.saveToDatabase}
          markerWindowIndex={this.state.markerWindowIndex}
          deleteFromDatabase={this.deleteFromDatabase}
          closeSave={this.hideButtons}
          isOpen={this.state.saveButton}
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
