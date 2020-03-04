import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {UNSELECTED_CARD_ID} from "../../const.js";
import {getCard} from "../../utils";


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
    const {cards, similarOffers, selectedCardId} = this.props;
    const card = cards[0];
    const {location} = card.city;
    const cityCoordinates = [location.latitude, location.longitude];
    const cityZoom = location.zoom;

    if (this._mapRef.current) {
      this.map = leaflet.map(this._mapRef.current, {
        center: cityCoordinates,
        zoom: cityZoom,
        zoomControl: false,
        marker: true
      });

      this.map.setView(cityCoordinates, cityZoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      this.markers = similarOffers.map((similarOffer) => {
        const coordinates = [similarOffer.location.latitude, similarOffer.location.longitude];
        return leaflet
          .marker(coordinates, {icon: this._icon})
          .addTo(this.map);
      });

      if (selectedCardId !== UNSELECTED_CARD_ID) {
        const selectedCard = getCard(selectedCardId, cards);
        const coordinates = [selectedCard.location.latitude, selectedCard.location.longitude];
        this.markers.push(
            leaflet
            .marker(coordinates, {icon: this._iconActive})
            .addTo(this.map)
        );
      }
    }
  }

  componentDidUpdate() {
    const {cards, similarOffers, selectedCardId} = this.props;
    const card = cards[0];
    const {location} = card.city;
    const cityCoordinates = [location.latitude, location.longitude];
    const cityZoom = location.zoom;

    if (this._mapRef.current) {
      this.map.setView(cityCoordinates, cityZoom);

      this.markers.forEach((marker) => marker.remove());
      this.markers = similarOffers.map((similarOffer) => {
        const coordinates = [similarOffer.location.latitude, similarOffer.location.longitude];
        return leaflet
          .marker(coordinates, {icon: this._icon})
          .addTo(this.map);
      });

      if (selectedCardId !== UNSELECTED_CARD_ID) {
        const selectedCard = getCard(selectedCardId, cards);
        const coordinates = [selectedCard.location.latitude, selectedCard.location.longitude];
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
  cards: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        city: PropTypes.exact({
          location: PropTypes.exact({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired,
          }).isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        bedrooms: PropTypes.number.isRequired,
        images: PropTypes.array.isRequired,
        description: PropTypes.string.isRequired,
        goods: PropTypes.array.isRequired,
        host: PropTypes.exact({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          avatarUrl: PropTypes.string.isRequired,
          isPro: PropTypes.bool.isRequired
        }).isRequired,
        isFavorite: PropTypes.bool.isRequired,
        isPremium: PropTypes.bool.isRequired,
        location: PropTypes.exact({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }).isRequired,
        maxAdults: PropTypes.number.isRequired,
        previewImage: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  similarOffers: PropTypes.array.isRequired,
  selectedCardId: PropTypes.number.isRequired,
  sectionClassName: PropTypes.string.isRequired
};
