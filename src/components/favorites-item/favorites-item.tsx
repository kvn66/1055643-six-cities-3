import * as React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {MemoizedOfferSmallCard} from "../offer-small-card/offer-small-card.jsx";
import {AppRoute, CardClassName} from "../../const";

const FavoritesItem = (props) => {
  const {favoritesForCity} = props;
  const {city, cards} = favoritesForCity;
  const cardsList = cards.map((card) =>
    <MemoizedOfferSmallCard key={card.id} card={card} className={CardClassName.FAVORITES} />
  );

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.ROOT}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {cardsList}
      </div>
    </li>
  );
};

FavoritesItem.propTypes = {
  favoritesForCity: PropTypes.exact({
    city: PropTypes.string.isRequired,
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
  }).isRequired,
};

export const MemoizedFavoritesItem = React.memo(FavoritesItem);

export default FavoritesItem;
