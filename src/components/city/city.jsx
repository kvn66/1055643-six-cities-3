import React from "react";
import PropTypes from 'prop-types';
import {MemoizedOfferSmallCard} from "../offer-small-card/offer-small-card.jsx";
import Map from "../map/map.jsx";
import SoringCardsMenu from "../sorting-cards-menu/sorting-cards-menu.jsx";
import {getSimilarOffers} from "../../utils";
import {ActionCreator} from "../../reducers/card-select/card-select";
import {getCardsCount, getCardsForSelectedCity, getSelectedCityName} from "../../reducers/cards/selectors";
import {getSortingMethodId} from "../../reducers/cards-sorting-menu/selectors";
import {getSelectedCardId} from "../../reducers/card-select/selectors";
import {connect} from "react-redux";

const MAP_CLASS_NAME = `cities__map`;

const City = (props) => {
  const {cardsInStore, cards, sortedCards, cityName, selectedCard, setSelectedCard} = props;
  const similarOffers = getSimilarOffers(sortedCards, selectedCard, true);
  const cardsElement = sortedCards.map((card) =>
    <MemoizedOfferSmallCard key={card.id} card={card} setSelectedCard = {setSelectedCard} isDetail={false} />
  );

  return (
    <div className="cities">
      {cardsInStore ? (
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{sortedCards.length} places to stay in {cityName}</b>
            <SoringCardsMenu />
            <div className="cities__places-list places__list tabs__content">
              {cardsElement}
            </div>
          </section>
          <div className="cities__right-section">
            <Map cards={cards} similarOffers={similarOffers} selectedCardId={selectedCard} sectionClassName={MAP_CLASS_NAME}/>
          </div>
        </div>
      ) : (
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property availbale at the moment in {cityName}
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
  const cards = getCardsForSelectedCity(store);
  let sortedCards = [];

  switch (getSortingMethodId(store)) {
    case 1:
      sortedCards = cards.slice().sort((a, b) => a.price - b.price);
      break;
    case 2:
      sortedCards = cards.slice().sort((a, b) => b.price - a.price);
      break;
    case 3:
      sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedCards = cards.slice();
      break;
  }

  return {
    cardsInStore: getCardsCount(store),
    cards,
    sortedCards,
    cityName: getSelectedCityName(store),
    selectedCard: getSelectedCardId(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCard: (id) => dispatch(ActionCreator.setSelectedCardId(id))
  };
};

City.propTypes = {
  cardsInStore: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  sortedCards: PropTypes.array.isRequired,
  cityName: PropTypes.string,
  selectedCard: PropTypes.number,
  setSelectedCard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
