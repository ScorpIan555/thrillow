"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
module.exports = function (props) {


  // // Pass image-related props into local variables which will be componsed into a full url string for use as src prop

  var imagePath = "https://maps.googleapis.com/maps/api/streetview";
  var imageSize = "size=400x400";
  var imageQueryPathArray = [imagePath, imageSize];
  var imageQueryPath = imageQueryPathArray.join("?");
  console.log(imageQueryPath);
  // const imageLocation = props.imageLocation
  // const imageFOV = props.imageFOV
  // const imageHeading = props.imageHeading
  // const imagePitch = props.imagePitch
  // const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

  // const imagePath = 'https://maps.googleapis.com/maps/api/streetview'
  // const imageSize = 'size=400x400'
  // const imageLocation = 'location=40.720032,-73.988354'
  // const imageFOV = 'fov=90'
  // const imageHeading = 'heading=235'
  // const imagePitch = 'pitch=10'
  // const googleMapsApiKey = 'key=
  //
  // // Compose url string for src
  // const imageUrlQueryArray = [imageSize, imageLocation, imageFOV, imageHeading, imagePitch, googleMapsApiKey]
  // const imageUrlQueryString = imageUrlArray.join('&')
  // const imageUrlArray = [imagePath, imageUrlQueryString]
  // const fullyComposedImageUrlString = imageUrlArray.join('?')

  var imageUrl = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=AIzaSyAGZkIyl-VNKwjTWBFFP_xb_R8nK2GQmzs";


  return React.createElement(
    "div",
    { className: "col-sm" },
    React.createElement("img", { style: localStyle,
      alt: "Image",
      src: imageUrl,
      className: "img-fluid rounded" })
  );
};

var localStyle = {
  height: "200px",
  width: "200px"
};