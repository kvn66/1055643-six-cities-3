import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {getPlace} from "../../util";
import {UNSELECTED_CARD_ID} from "../../const.js";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();

    this._icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30]
    });

    this._iconActive = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [30, 30]
    });
  }

  componentDidMount() {
    const {locations, cityId, similarOffers, activeOffer} = this.props;
    const location = locations[cityId];
    const {cityCoordinates} = location;

    if (this._mapRef.current) {
      const zoom = 12;

      this.map = leaflet.map(this._mapRef.current, {
        center: cityCoordinates,
        zoom,
        zoomControl: false,
        marker: true
      });

      this.map.setView(cityCoordinates, zoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      similarOffers.forEach((similarOffer) => {
        const coordinates = getPlace(similarOffer, locations).place.coordinates;
        leaflet
          .marker(coordinates, {icon: this._icon})
          .addTo(this.map);
      });

      if (activeOffer !== UNSELECTED_CARD_ID) {
        const coordinates = getPlace(activeOffer, locations).place.coordinates;
        leaflet
          .marker(coordinates, {icon: this._iconActive})
          .addTo(this.map);
      }
    }
  }

  componentDidUpdate() {
    const {locations, similarOffers, activeOffer} = this.props;

    if (this._mapRef.current) {
      similarOffers.forEach((similarOffer) => {
        const coordinates = getPlace(similarOffer, locations).place.coordinates;
        leaflet
          .marker(coordinates, {icon: this._icon})
          .addTo(this.map);
      });

      if (activeOffer !== UNSELECTED_CARD_ID) {
        const coordinates = getPlace(activeOffer, locations).place.coordinates;
        leaflet
          .marker(coordinates, {icon: this._iconActive})
          .addTo(this.map);
      }
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return (
      <div ref={this._mapRef} style={{height: `100%`}} />
    );
  }
}

Map.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired,
  cityId: PropTypes.number.isRequired,
  similarOffers: PropTypes.array.isRequired,
  activeOffer: PropTypes.number
};
