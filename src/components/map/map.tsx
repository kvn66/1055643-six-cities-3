import * as React from "react";
import * as leaflet from "leaflet";
import {UNSELECTED_CARD_ID} from "../../const";
import {getCard} from "../../utils";
import {CardsType} from "../../types";


type Props = {
  cards: CardsType;
  similarOffers: CardsType;
  selectedCardId: number;
  isDetail: boolean;
  sectionClassName: string;
}

export default class Map extends React.PureComponent<Props, {}> {
  private readonly _mapRef: React.RefObject<any>;
  private _markers: any[];
  private _icon: any;
  private _iconActive: any;
  private _map: any;

  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this._markers = [];

    this._icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30]
    });

    this._iconActive = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [30, 30]
    });
  }

  addMarkers(similarOffers: CardsType, selectedCardId: number): void {
    this._markers = similarOffers.filter((cardItem) => cardItem.id !== selectedCardId).map((similarOffer) => {
      const coordinates = [similarOffer.location.latitude, similarOffer.location.longitude];
      return leaflet
        .marker(coordinates, {icon: this._icon})
        .addTo(this._map);
    });
  }

  addSelectedMarker(cards: CardsType, selectedCardId: number): void {
    if (selectedCardId !== UNSELECTED_CARD_ID) {
      const selectedCard = getCard(selectedCardId, cards);
      if (selectedCard) {
        const coordinates = [selectedCard.location.latitude, selectedCard.location.longitude];
        this._markers.push(
            leaflet
              .marker(coordinates, {icon: this._iconActive})
              .addTo(this._map)
        );
      }
    }
  }

  componentDidMount() {
    const {cards, similarOffers, selectedCardId, isDetail} = this.props;
    const card = isDetail ? getCard(selectedCardId, cards) : cards[0];
    const {location} = card.city;
    const cityCoordinates = [location.latitude, location.longitude];
    const cityZoom = location.zoom;

    if (this._mapRef.current) {
      this._map = leaflet.map(this._mapRef.current, {
        center: cityCoordinates,
        zoom: cityZoom,
        zoomControl: false,
        marker: true
      });

      this._map.setView(cityCoordinates, cityZoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this._map);

      this.addMarkers(similarOffers, selectedCardId);

      this.addSelectedMarker(cards, selectedCardId);
    }
  }

  componentDidUpdate() {
    const {cards, similarOffers, selectedCardId, isDetail} = this.props;
    const card = isDetail ? getCard(selectedCardId, cards) : cards[0];
    const {location} = card.city;
    const cityCoordinates = [location.latitude, location.longitude];
    const cityZoom = location.zoom;

    if (this._mapRef.current) {
      this._map.setView(cityCoordinates, cityZoom);

      this._markers.forEach((marker) => marker.remove());

      this.addMarkers(similarOffers, selectedCardId);

      this.addSelectedMarker(cards, selectedCardId);
    }
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
  }

  render() {
    const {sectionClassName} = this.props;
    return (
      <section ref={this._mapRef} className={`${sectionClassName} map`} />
    );
  }
}
