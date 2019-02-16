import React, { Component } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";

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
      <Marker position={props.marker} />
    </GoogleMap>
  ))
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: false
    };
  }

  saveCoordinates = event => {
    this.setState({
      marker: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    });
  };

  render() {
    return (
      <div>
        <MapComponent
          lat={51.52713}
          lng={-0.07806}
          marker={this.state.marker}
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
