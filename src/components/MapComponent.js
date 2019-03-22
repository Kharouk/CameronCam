import React, { Component, useState } from "react";
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
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Geocode from "react-geocode";

const cameron = require("./styles/images/pin.png");

let url = `https://maps.googleapis.com/maps/api/js?key=${
  process.env.REACT_APP_GOOGLE_API_KEY
}`;

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const SocialLinks = marker => {
  const [city, setCity] = useState(null);
  const [quote, setQuote] = useState(null);
  Geocode.fromLatLng(marker.lat, marker.lng).then(
    response => {
      setCity(response.results[0].address_components[2].long_name);
      if (city !== null) {
        setQuote(
          `I spotted David Cameron around ${city} with CameronCam! Help us find him at CameronCam.com!`
        );
      } else {
        setQuote(
          `I spotted David Cameron with #CameronCam! Help us find him at CameronCam.com!`
        );
      }
    },
    error => {
      setQuote(
        `I spotted David Cameron with #CameronCam! Help us find him at CameronCam.com!`
      );
    }
  );
  return (
    <div className="social--links">
      <FacebookShareButton
        quote={quote}
        url="https://cameron-cam.surge.sh"
        hashtag="#cameroncam"
        style={{
          display: "inline-block",
          outline: "none"
        }}
      >
        <FontAwesomeIcon
          icon={["fab", "facebook"]}
          size="2x"
          className="share--button"
        />
      </FacebookShareButton>
      <TwitterShareButton
        title={quote}
        hashtags={["cameroncam", "brexit"]}
        url="https://cameron-cam.surge.sh"
        style={{
          float: "left",
          outline: "none"
        }}
      >
        <FontAwesomeIcon
          icon={["fab", "twitter"]}
          size="2x"
          className="share--button"
        />
      </TwitterShareButton>
      <RedditShareButton
        title={quote}
        url="https://cameron-cam.surge.sh"
        style={{
          float: "right",
          outline: "none"
        }}
      >
        <FontAwesomeIcon
          icon={["fab", "reddit"]}
          size="2x"
          className="share--button"
        />
      </RedditShareButton>
    </div>
  );
};

const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      onClick={props.onMapClick}
      zoom={3}
      // Main:
      // defaultCenter={{ lat: 56.0119872993935, lng: -4.6038123275092175 }}
      // London:
      defaultCenter={{ lat: 51.509, lng: -0.118092 }}
      defaultClickableIcons={false}
    >
      {/* Currently Selecting Marker: */}
      {props.user && (
        <Marker
          icon={cameron}
          onClick={() => props.toggleInfo()}
          position={props.marker}
        >
          {props.isSaveOpen && (
            <InfoWindow onCloseClick={props.hideSaveInfo}>
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <ImageUpload
                  handleUpload={props.handleImageUpload}
                  imageStorage={props.imageStorage}
                />
                <Description handleChange={props.descHandleChange} />
                <Button
                  isSaveButton={true}
                  saveToDatabase={props.saveToDatabase}
                />
              </div>
            </InfoWindow>
          )}
        </Marker>
      )}

      {/* Already saved Markers from DB: */}
      {props.markers.map((marker, index) => {
        console.log(props.user);
        return (
          <Marker
            icon={cameron}
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.markerHandleClick(index)}
          >
            {props.isOpen && props.markerWindowIndex === index && (
              <InfoWindow onCloseClick={props.hideInfo}>
                <div style={{ textAlign: "center", margin: "0 auto" }}>
                  {marker.img && (
                    <img
                      src={marker.img}
                      alt={marker.desc}
                      onLoad={() => props.handleImageLoad()}
                    />
                  )}
                  <p>{marker.desc}</p>
                  {SocialLinks(marker)}
                  {(props.user && props.user.uid === marker.uid) ||
                    (props.user &&
                      props.user.uid === process.env.REACT_APP_ADMIN && (
                        <Button
                          isSaveButton={false}
                          deleteFromDatabase={() =>
                            props.deleteFromDatabase(marker)
                          }
                        />
                      ))}
                </div>
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
      saveInfoBox: true,
      index: 0,
      imageLoaded: false
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
    const { saveInfoBox } = this.state;
    this.setState({ saveInfoBox: !saveInfoBox });
  };

  handleImageUpload = filename => {
    this.props.storage
      .child(filename)
      .getDownloadURL()
      .then(url => {
        const { marker } = this.state;
        marker.img = url;
        this.setState({ ...marker });
      });
  };

  handleImageLoad = () => {
    this.setState({ imageLoaded: !this.state.imageLoaded });
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
    this.setState({ markerWindowIndex: num, infoBox: true });
  };

  getIndex = () => {
    this.props.db.ref("index/").on("value", snapshot => {
      const result = snapshot.val();
      this.setState({ index: result });
    });
  };

  hideInfo = () => {
    this.setState({ infoBox: false });
  };

  hideSafeInfo = () => {
    this.setState({ saveInfoBox: false, marker: { desc: "", img: "" } });
  };

  saveCoordinates = event => {
    this.setState({
      marker: {
        id: this.state.index,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      saveInfoBox: true
    });
  };

  saveToDatabase = () => {
    this.props.db.ref("index/").set(this.state.index + 1);
    const { marker } = this.state;
    marker.uid = this.props.user.uid;
    this.props.db.ref("sightings/" + this.state.index).set(marker);
    this.hideSafeInfo();
  };

  render() {
    return (
      <div id="map">
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
          hideSaveInfo={this.hideSafeInfo}
          toggleInfo={this.toggleInfo}
          isOpen={this.state.infoBox}
          isSaveOpen={this.state.saveInfoBox}
          user={this.props.user}
          googleMapURL={url}
          handleImageLoad={this.handleImageLoad}
          imageLoaded={this.state.imageLoaded}
          loadingElement={<div style={{ height: `100vh`, width: `100vw` }} />}
          containerElement={<div style={{ height: `100vh`, width: `100vw` }} />}
          mapElement={<div style={{ height: `100vh`, width: `100vw` }} />}
        />
      </div>
    );
  }
}

export default Map;
