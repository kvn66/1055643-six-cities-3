import React from "react";
import PropTypes from 'prop-types';
import {UNSELECTED_CARD_ID} from "../../const.js";
import {Link} from "react-router-dom";

const OfferSmallCard = (props) => {
  const {place, openDetail, setSelectedCard} = props;
  const {id, images, priceValue, priceText, name, type, isPremium} = place;
  const linkToDetail = `/offer/${id}`;

  const nameClickHandler = () => {
    openDetail(id);
  };

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
          <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place image"/>
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
        <h2 onClick={nameClickHandler} className="place-card__name">
          <Link to={linkToDetail}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferSmallCard.propTypes = {
  place: PropTypes.exact({
    id: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    adults: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    inside: PropTypes.array.isRequired,
    isPremium: PropTypes.bool.isRequired,
    owner: PropTypes.exact({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired
    }).isRequired,
  }).isRequired,
  openDetail: PropTypes.func.isRequired,
  setSelectedCard: PropTypes.func.isRequired
};

export default OfferSmallCard;
