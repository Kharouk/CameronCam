import React, { Component } from "react";
import Button from "./Button";
import ImageUpload from "./ImageUpload";
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
      <Marker
        icon={cameron}
        onClick={() => props.toggleInfo()}
        position={props.marker}
      >
        {props.isOpen && (
          <InfoWindow onCloseClick={props.hideInfo}>
            <>
              <ImageUpload
                handleUpload={props.handleImageUpload}
                imageStorage={props.imageStorage}
              />
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
        console.log(index);
        return (
          <Marker
            icon={cameron}
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.markerHandleClick(index)}
          >
            {props.isOpen && props.markerWindowIndex === index && (
              <InfoWindow onCloseClick={props.hideInfo}>
                <>
                  <img src={marker.img} alt="" />
                  <p>{marker.desc}</p>
                  <Button
                    isSaveButton={false}
                    deleteFromDatabase={() => props.deleteFromDatabase(marker)}
                  />
                </>
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
      marker: {
        id: "",
        lat: "",
        lng: "",
        title: "",
        desc: "",
        img: ""
      },
      markerWindowIndex: null,
      markers: [],
      infoBox: false,
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

  toggleInfo = () => {
    const { infoBox } = this.state;
    console.log(infoBox);
    this.setState({ infoBox: !infoBox });
  };

  handleImageUpload = filename => {
    this.props.storage
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        const { marker } = this.state;
        marker.img = url;
        this.setState({ ...marker });
      });
  };

  descHandleChange = e => {
    const { marker } = this.state;
    marker.desc = e.target.value;
    this.setState({ ...marker });
  };

  deleteFromDatabase = marker => {
    this.props.db.ref("sightings/" + marker.id).set(null);
  };

  markerHandleClick = num => {
    console.log(this.state.infoBox);
    this.setState({ markerWindowIndex: num, infoBox: true });
  };

  getIndex = () => {
    this.props.db.ref("index/").on("value", snapshot => {
      const result = snapshot.val();
      this.setState({ index: result });
    });
  };

  hideInfo = () => {
    this.setState({ infoBox: false, marker: { desc: "", img: "" } });
  };

  saveCoordinates = event => {
    this.setState({
      marker: {
        id: this.state.index,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      infoBox: true
    });
  };

  saveToDatabase = () => {
    this.props.db.ref("index/").set(this.state.index + 1);
    this.props.db.ref("sightings/" + this.state.index).set(this.state.marker);
    this.hideInfo();
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
          handleImageUpload={this.handleImageUpload}
          imageStorage={this.props.storage}
          descHandleChange={this.descHandleChange}
          deleteFromDatabase={this.deleteFromDatabase}
          hideInfo={this.hideInfo}
          toggleInfo={this.toggleInfo}
          isOpen={this.state.infoBox}
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
