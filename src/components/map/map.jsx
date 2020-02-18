import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    // const {src} = this.props;
    // const map = this._mapRef.current;

    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    const zoom = 12;

    this.map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom: zoom,
      zoomControl: false,
      marker: true
    });
    this.map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
    const offerCords = [52.3709553943508, 4.89309666406198];

    leaflet
      .marker(offerCords, {icon})
      .addTo(this.map);
  }

  componentWillUnmount() {
  }

  render() {

    return (
      <Fragment>
        <div ref={this._mapRef}/>
      </Fragment>
    );
  }

  componentDidUpdate() {
  }
}

Map.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
