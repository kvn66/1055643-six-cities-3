import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  componentDidMount() {
    const {location} = this.props;
    const {cityCoordinates, places} = location;


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

    places.forEach((place) => {
      leaflet
        .marker(place.coordinates, {icon})
        .addTo(this.map);
    });
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return (
      <Fragment>
        <section ref={this._mapRef} className="cities__map map" />
      </Fragment>
    );
  }
}

Map.propTypes = {
  location: PropTypes.exact({
    city: PropTypes.string.isRequired,
    cityCoordinates: PropTypes.array.isRequired,
    places: PropTypes.array.isRequired
  }).isRequired,
};
