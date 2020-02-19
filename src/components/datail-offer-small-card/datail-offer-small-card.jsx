import React from "react";
import PropTypes from 'prop-types';
import OfferSmallCard from "../offer-small-card/offer-small-card.jsx";

const DetailOfferSmallCard = (props) => {
  const {place} = props;
  const {images} = place;

  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <OfferSmallCard place={place} />
    </article>
  );
};

DetailOfferSmallCard.propTypes = {
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
  }).isRequired
};

export default DetailOfferSmallCard;
