import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {getPlace} from "../../util";
import {UNSELECTED_CARD_ID} from "../../const.js";

const ZOOM = 12;


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this.markers = [];

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
      this.map = leaflet.map(this._mapRef.current, {
        center: cityCoordinates,
        zoom: ZOOM,
        zoomControl: false,
        marker: true
      });

      this.map.setView(cityCoordinates, ZOOM);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      this.markers = similarOffers.map((similarOffer) => {
        const coordinates = getPlace(similarOffer, locations).place.coordinates;
        return leaflet
          .marker(coordinates, {icon: this._icon})
          .addTo(this.map);
      });

      if (activeOffer !== UNSELECTED_CARD_ID) {
        const coordinates = getPlace(activeOffer, locations).place.coordinates;
        this.markers.push(
            leaflet
            .marker(coordinates, {icon: this._iconActive})
            .addTo(this.map)
        );
      }
    }
  }

  componentDidUpdate() {
    const {locations, cityId, similarOffers, activeOffer} = this.props;
    const location = locations[cityId];
    const {cityCoordinates} = location;

    if (this._mapRef.current) {
      this.map.setView(cityCoordinates, ZOOM);

      this.markers.forEach((marker) => marker.remove());
      this.markers = similarOffers.map((similarOffer) => {
        const coordinates = getPlace(similarOffer, locations).place.coordinates;
        return leaflet
          .marker(coordinates, {icon: this._icon})
          .addTo(this.map);
      });

      if (activeOffer !== UNSELECTED_CARD_ID) {
        const coordinates = getPlace(activeOffer, locations).place.coordinates;
        this.markers.push(
            leaflet
              .marker(coordinates, {icon: this._iconActive})
              .addTo(this.map)
        );
      }
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  render() {
    const {sectionClassName} = this.props;
    return (
      <section ref={this._mapRef} className={`${sectionClassName} map`} />
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
  activeOffer: PropTypes.number.isRequired,
  sectionClassName: PropTypes.string.isRequired
};
