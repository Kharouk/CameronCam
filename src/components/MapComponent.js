import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const MapComponent = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap zoom={13} defaultCenter={{ lat: 51.52713, lng: -0.07806 }} />
    );
  })
);

export default MapComponent;
