import React from "react";
import PropTypes from 'prop-types';

const OfferSmallCard = (props) => {
  const {place} = props;
  const {id, priceValue, priceText, name, type} = place;
  const linkToDetail = `/offer/${id}`;

  return (
    <React.Fragment>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;{priceText}</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
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
        <h2 className="place-card__name">
          <a href={linkToDetail}>{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </React.Fragment>
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
  }).isRequired,
};

export default OfferSmallCard;
