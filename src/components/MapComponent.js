import React, { Component } from "react";
import Button from "./Button";
import Description from "./Description";
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
      defaultClickableIcons={false}
    >
      <Marker icon={cameron} position={props.marker}>
        {props.isOpen && (
          <InfoWindow onCloseClick={props.closeSave}>
            <>
              <Description handleChange={props.descHandleChange} />
              <Button
                isSaveButton={true}
                saveToDatabase={props.saveToDatabase}
              />
            </>
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
      title: "",
      desc: "",
      img: "",
      saveButton: false,
      index: 0
    };
  }

  componentWillMount() {
    this.getIndex();
    this.props.db.ref("sightings/").on(
      "value",
      snapshot => {
        const result = snapshot.val();
        if (result) {
          const markers = Object.keys(result).map(value => result[value]);
          this.setState({ markers });
        }
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  descHandleChange = e => {
    this.setState({ desc: e.target.value });
    console.log(this.state.desc);
  };

  deleteFromDatabase = marker => {
    this.props.db.ref("sightings/" + marker.id).set(null);
  };

  markerHandleClick = num => {
    this.setState({ markerWindowIndex: num });
  };

  getIndex = () => {
    this.props.db.ref("index/").on("value", snapshot => {
      const result = snapshot.val();
      this.setState({ index: result });
    });
  };

  hideSave = () => {
    this.setState({ saveButton: false, marker: { desc: "", img: "" } });
  };

  saveCoordinates = event => {
    this.setState({
      marker: {
        id: this.state.index,
        desc: this.state.desc,
        img: this.state.img,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      saveButton: true
    });

    console.log(this.state.marker);
  };

  saveToDatabase = () => {
    this.props.db.ref("index/").set(this.state.index + 1);
    this.props.db.ref("sightings/" + this.state.index).set(this.state.marker);
    this.hideSave();
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
          descHandleChange={this.descHandleChange}
          deleteFromDatabase={this.deleteFromDatabase}
          closeSave={this.hideSave}
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
