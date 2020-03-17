import React from "react";
import PropTypes from 'prop-types';
import {MemoizedOfferSmallCard} from "../offer-small-card/offer-small-card.jsx";
import {ActionCreator} from "../../reducers/card-select/card-select";
import {getCardsCount, getCardsForSelectedCity, getSelectedCityName, getSortedCardsForSelectedCity} from "../../reducers/cards/selectors";
import {getSelectedCardId} from "../../reducers/card-select/selectors";
import {connect} from "react-redux";
import {MemoizedHeader} from "../header/header.jsx";

const Favorites = (props) => {
  const {cardsInStore, cards, sortedCards, cityName, selectedCard, setSelectedCard} = props;
  const cardsElement = sortedCards.map((card) =>
    <MemoizedOfferSmallCard key={card.id} card={card} setSelectedCard = {setSelectedCard} isDetail={false} />
  );

  return (
    <div className="page">
      <MemoizedHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image" src="/img/apartment-small-03.jpg" width="150" height="110"
                          alt="Place image"
                        />
                      </a>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                        >
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"/>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style="width: 100%"/>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Nice, cozy, warm big bed apartment</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>

                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image" src="img/room-small.jpg" width="150" height="110"
                          alt="Place image"
                        />
                      </a>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;80</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                        >
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"/>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style="width: 80%"/>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Wood and stone place</a>
                      </h2>
                      <p className="place-card__type">Private room</p>
                    </div>
                  </article>
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image" src="img/apartment-small-04.jpg" width="150" height="110"
                          alt="Place image"
                        />
                      </a>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                        >
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"/>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style="width: 100%"/>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">White castle</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCard: (id) => dispatch(ActionCreator.setSelectedCardId(id))
  };
};

Favorites.propTypes = {
  cardsInStore: PropTypes.number.isRequired,
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
  sortedCards: PropTypes.arrayOf(
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
  cityName: PropTypes.string,
  selectedCard: PropTypes.number,
  setSelectedCard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
