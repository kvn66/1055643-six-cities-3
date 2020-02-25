import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {UNSELECTED_CARD_ID} from "../../const.js";
import OfferSmallCard from "../offer-small-card/offer-small-card.jsx";
import Map from "../map/map.jsx";
import {getSimilarOffers} from "../../utils";

const MAP_CLASS_NAME = `cities__map`;

class City extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: UNSELECTED_CARD_ID,
    };

    this._setSelectedCard = this._setSelectedCard.bind(this);
  }

  _setSelectedCard(id) {
    this.setState({
      selectedCard: id,
    });
  }

  render() {
    const {locations, cityId} = this.props;
    const location = locations[cityId];
    const {city, places} = location;
    const similarOffers = getSimilarOffers(cityId, locations, this.state.selectedCard, true);
    const cards = places.map((place) =>
      <OfferSmallCard key={place.id} place={place} setSelectedCard = {this._setSelectedCard} isDetail={false} />
    );

    return (
      <div className="cities">
        {places.length ? (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{places.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {cards}
              </div>
            </section>
            <div className="cities__right-section">
              <Map locations={locations} cityId={cityId} similarOffers={similarOffers} activeOffer={this.state.selectedCard} sectionClassName={MAP_CLASS_NAME}/>
            </div>
          </div>
        ) : (
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property availbale at the moment in {city}
                </p>
              </div>
            </section>
            <div className="cities__right-section"/>
          </div>
        )}
      </div>
    );
  }
}

City.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired,
  cityId: PropTypes.number.isRequired
};

export default City;
