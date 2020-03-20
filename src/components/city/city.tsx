import * as React from "react";
import {CardType} from "../../types";
import {MemoizedOfferSmallCard} from "../offer-small-card/offer-small-card";
import CityMap from "../city-map/city-map";
import SoringCardsMenu from "../sorting-cards-menu/sorting-cards-menu";
import {getCardsCount, getCardsForSelectedCity, getSelectedCityName, getSortedCardsForSelectedCity} from "../../reducers/cards/selectors";
import {getSelectedCardId} from "../../reducers/card-select/selectors";
import {connect} from "react-redux";
import {CardClassName} from "../../const";

const MAP_CLASS_NAME = `cities__map`;

type Props = {
  cardsInStore: number;
  cards: CardType[];
  sortedCards: CardType[];
  cityName: string;
  selectedCard: number;
}

const City: React.FunctionComponent<Props> = (props: Props) => {
  const {cardsInStore, cards, sortedCards, cityName, selectedCard} = props;
  const cardsElement = sortedCards.map((card) =>
    <MemoizedOfferSmallCard key={card.id} card={card} className={CardClassName.CITY} />
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
            <CityMap
              cards={cards}
              similarOffers={cards}
              selectedCardId={selectedCard}
              isDetail={false}
              sectionClassName={MAP_CLASS_NAME}
            />
          </div>
        </div>
      ) : (
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in {cityName}
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
  return {
    cardsInStore: getCardsCount(store),
    cards: getCardsForSelectedCity(store),
    sortedCards: getSortedCardsForSelectedCity(store),
    cityName: getSelectedCityName(store),
    selectedCard: getSelectedCardId(store),
  };
};

export default connect(mapStateToProps)(City);
