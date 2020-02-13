import React from "react";
import PropTypes from 'prop-types';
import {UNSELECTED_CARD_ID} from "../../const.js";

const OfferSmallCard = (props) => {
  const {place, onNameClick, setSelectedCard} = props;
  const {id, image, priceValue, priceText, name, type, isPremium} = place;

  const mouseEnterHandler = () => {
    setSelectedCard(id);
  };

  const mouseLeaveHandler = () => {
    setSelectedCard(UNSELECTED_CARD_ID);
  };

  return (
    <article onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className="cities__place-card place-card">
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;{priceText}</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button" type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark-active"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `80%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 onClick={onNameClick} className="place-card__name">
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferSmallCard.propTypes = {
  place: PropTypes.exact({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired
  }).isRequired,
  onNameClick: PropTypes.func.isRequired,
  setSelectedCard: PropTypes.func.isRequired
};

export default OfferSmallCard;
