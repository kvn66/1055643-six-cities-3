import * as React from "react";
import {Link} from "react-router-dom";
import {MemoizedOfferSmallCard} from "../offer-small-card/offer-small-card";
import {AppRoute, CardClassName} from "../../const";
import {FavoritesForCityType} from "../../types";

type Props = {
  favoritesForCity: FavoritesForCityType;
}

const FavoritesItem: React.FunctionComponent<Props> = (props: Props) => {
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

export const MemoizedFavoritesItem = React.memo(FavoritesItem);

export default FavoritesItem;
