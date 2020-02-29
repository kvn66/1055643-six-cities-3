import React from "react";
import PropTypes from 'prop-types';
import {UNSELECTED_CARD_ID} from "../../const.js";

const ClassName = {
  CITY: {
    ARTICLE: `cities__place-card`,
    IMAGE: `cities__image-wrapper`
  },
  DETAIL: {
    ARTICLE: `near-places__card`,
    IMAGE: `near-places__image-wrapper`
  }
};

const OfferSmallCard = (props) => {
  const {place, setSelectedCard, isDetail} = props;
  const {id, images, priceValue, priceText, name, type, rating, isPremium} = place;
  const linkToDetail = `/offer/${id}`;
  const articleClassName = isDetail ? ClassName.DETAIL.ARTICLE : ClassName.CITY.ARTICLE;
  const imageClassName = isDetail ? ClassName.DETAIL.IMAGE : ClassName.CITY.IMAGE;

  const mouseEnterHandler = () => {
    setSelectedCard(id);
  };

  const mouseLeaveHandler = () => {
    setSelectedCard(UNSELECTED_CARD_ID);
  };

  return (
    <article onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className={`${articleClassName} place-card`}>
      {isPremium && !isDetail &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${imageClassName} place-card__image-wrapper`}>
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
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={linkToDetail}>{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferSmallCard.propTypes = {
  place: PropTypes.exact({
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descriptions: PropTypes.array.isRequired,
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
    reviews: PropTypes.array.isRequired,
  }).isRequired,
  setSelectedCard: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired
};

export default OfferSmallCard;
