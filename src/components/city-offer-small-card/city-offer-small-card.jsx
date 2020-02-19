import React from "react";
import PropTypes from 'prop-types';
import {UNSELECTED_CARD_ID} from "../../const.js";
import OfferSmallCard from "../offer-small-card/offer-small-card.jsx";

const CityOfferSmallCard = (props) => {
  const {place, setSelectedCard} = props;
  const {id, images, isPremium} = place;

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
      <OfferSmallCard place={place} />
    </article>
  );
};

CityOfferSmallCard.propTypes = {
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
  setSelectedCard: PropTypes.func.isRequired
};

export default CityOfferSmallCard;
