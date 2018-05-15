"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactPlacesAutocomplete = require("react-places-autocomplete");

var PlacesAutocomplete = _interopRequire(_reactPlacesAutocomplete);

var geocodeByAddress = _reactPlacesAutocomplete.geocodeByAddress;
var getLatLng = _reactPlacesAutocomplete.getLatLng;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions"));

var LocationSearchInput = (function (Component) {
  function LocationSearchInput(props) {
    _classCallCheck(this, LocationSearchInput);

    _get(Object.getPrototypeOf(LocationSearchInput.prototype), "constructor", this).call(this, props);
    this.state = {
      address: "",
      latLng: {}
    };
  }

  _inherits(LocationSearchInput, Component);

  _prototypeProperties(LocationSearchInput, null, {
    handleChange: {
      // Handle change for controlled component
      value: function handleChange(address) {
        this.setState({ address: address });
        console.log(this.state.address);
      },
      writable: true,
      configurable: true
    },
    handleSelect: {
      // Handle select for controlled component
      value: function handleSelect(address) {
        var _this = this;
        console.log("address: ", address);
        console.log("this.state: ", this.state);
        geocodeByAddress(address).then(function (results) {
          return getLatLng(results[0]);
        }).then(function (latLng) {
          return _this.setState({ latLng: latLng });
        }).then(console.log("this.state after setState for latLng: ", this.state))["catch"](function (error) {
          return console.error("Error", error);
        });

        // //Log latLng
        // console.log('this.state after setState for latLng: ', this.state)
        // Split address from search box for input into Zillow API
        var paramsAddress = address.split(",", 1);
        // Split citystatezip from search box for input into Zillow API
        var arrayFromAddressAndCitystatezip = address.split(",");
        var citystatezip = arrayFromAddressAndCitystatezip[1] + "," + arrayFromAddressAndCitystatezip[2];
        // Store Zillow API parameters in client, to be passed into back-end
        var params = {
          address: paramsAddress,
          citystatezip: citystatezip
        };

        var latLngFromGeocodeApi = this.state.latLng;
        console.log("latLngFromGeocodeApi", latLngFromGeocodeApi);

        // this.setState({
        //
        // })
        // Send search box input params to back-end thru Redux
        this.props.getZillowListingResults(params).then(this.props.dispatchLatLngFromSearchBoxToStore(latLngFromGeocodeApi));
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        console.log(this.state);
        console.log(this.props);

        return React.createElement(
          PlacesAutocomplete,
          {
            value: this.state.address,
            onChange: this.handleChange.bind(this),
            onSelect: this.handleSelect.bind(this)
          },
          function (_ref) {
            var getInputProps = _ref.getInputProps;
            var suggestions = _ref.suggestions;
            var getSuggestionItemProps = _ref.getSuggestionItemProps;
            return React.createElement(
              "div",
              null,
              React.createElement("input", getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })),
              React.createElement(
                "div",
                { className: "autocomplete-dropdown-container" },
                suggestions.map(function (suggestion) {
                  var className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                  var style = suggestion.active ? { backgroundColor: "#fafafa", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return React.createElement(
                    "div",
                    getSuggestionItemProps(suggestion, { className: className, style: style }),
                    React.createElement(
                      "span",
                      null,
                      suggestion.description
                    )
                  );
                })
              )
            );
          }
        );
      },
      writable: true,
      configurable: true
    }
  });

  return LocationSearchInput;
})(Component);

var stateToProps = function (state) {
  return {};
};

var dispatchToProps = function (dispatch) {
  return {
    // dispatchAddressFromSearchBoxToZillowAPI: (params) => dispatch(actions.dispatchAddressFromSearchBoxToZillowAPI(params)),
    getZillowListingResults: function (params) {
      return dispatch(actions.getZillowListingResults(params));
    },
    dispatchLatLngFromSearchBoxToStore: function (latLngFromGeocodeApi) {
      return dispatch(actions.dispatchLatLngFromSearchBoxToStore(latLngFromGeocodeApi));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(LocationSearchInput);
// this.setState({
//
// })
// inline style for demonstration purpose