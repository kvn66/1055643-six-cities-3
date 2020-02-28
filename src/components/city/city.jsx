import React from "react";
import PropTypes from 'prop-types';
import OfferSmallCard from "../offer-small-card/offer-small-card.jsx";
import Map from "../map/map.jsx";
import SoringCardsMenu from "../sorting-cards-menu/sorting-cards-menu.jsx";
import {getSimilarOffers} from "../../utils";
import {setSelectedCardIdAction} from "../../reducers/card-select";
import {connect} from "react-redux";

const MAP_CLASS_NAME = `cities__map`;

const City = (props) => {
  const {locations, sortedPlaces, cityId, selectedCard, setSelectedCard} = props;
  const location = locations[cityId];
  const {city} = location;
  const similarOffers = getSimilarOffers(sortedPlaces, selectedCard, true);
  const cards = sortedPlaces.map((place) =>
    <OfferSmallCard key={place.id} place={place} setSelectedCard = {setSelectedCard} isDetail={false} />
  );

  return (
    <div className="cities">
      {sortedPlaces.length ? (
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{sortedPlaces.length} places to stay in {city}</b>
            <SoringCardsMenu />
            <div className="cities__places-list places__list tabs__content">
              {cards}
            </div>
          </section>
          <div className="cities__right-section">
            <Map locations={locations} cityId={cityId} similarOffers={similarOffers} activeOffer={selectedCard} sectionClassName={MAP_CLASS_NAME}/>
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
};

const mapStateToProps = (store) => {
  const places = store.locations.locations[store.citySelect.cityId].places;
  let sortedPlaces = [];

  switch (store.cardsSortingMenu.sortingMethodId) {
    case 1:
      sortedPlaces = places.slice().sort((a, b) => a.priceValue - b.priceValue);
      break;
    case 2:
      sortedPlaces = places.slice().sort((a, b) => b.priceValue - a.priceValue);
      break;
    case 3:
      sortedPlaces = places.slice().sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedPlaces = places.slice();
      break;
  }

  return {
    locations: store.locations.locations,
    sortedPlaces,
    cityId: store.citySelect.cityId,
    selectedCard: store.cardSelect.cardId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCard: (id) => dispatch(setSelectedCardIdAction(id))
  };
};

City.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired,
  sortedPlaces: PropTypes.array.isRequired,
  cityId: PropTypes.number.isRequired,
  selectedCard: PropTypes.number.isRequired,
  setSelectedCard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
