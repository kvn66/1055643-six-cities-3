import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {getPlace} from "../../util";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  componentDidMount() {
    const {locations, cityId, similarOffers} = this.props;
    const location = locations[cityId];
    const {cityCoordinates} = location;

    if (this._mapRef.current) {
      const icon = leaflet.icon({
        iconUrl: `/img/pin.svg`,
        iconSize: [30, 30]
      });
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
          .marker(coordinates, {icon})
          .addTo(this.map);
      });
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
  similarOffers: PropTypes.array.isRequired
};
