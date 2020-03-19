import * as React from "react";
import {Link} from "react-router-dom";
import {UNSELECTED_CARD_ID, HotelType} from "../../const";
import {AppRoute} from "../../const";
import {ActionCreator} from "../../reducers/card-select/card-select";
import {Operation as FavoriteOperation} from "../../reducers/favorites/favorites";
import {connect} from "react-redux";
import {CardType, ClassNameType} from "../../types";

type Props = {
  card: CardType;
  className: ClassNameType;
  setSelectedCard: (id: number) => void;
  sendFavoriteStatus: (id: number) => void;
}

const OfferSmallCard: React.FunctionComponent<Props> = (props: Props) => {
  const {card, setSelectedCard, sendFavoriteStatus, className} = props;
  const {id, previewImage, price, title, type, rating, isFavorite, isPremium} = card;
  const linkToDetail = `${AppRoute.OFFER}/${id}`;

  const mouseEnterHandler = () => {
    setSelectedCard(id);
  };

  const mouseLeaveHandler = () => {
    setSelectedCard(UNSELECTED_CARD_ID);
  };

  const mouseClickLinkHandler = () => {
    setSelectedCard(UNSELECTED_CARD_ID);
  };

  const mouseClickFavoriteButtonHandler = (evt) => {
    evt.preventDefault();
    sendFavoriteStatus(id);
  };

  return (
    <article onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className={`${className.ARTICLE} place-card`}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${className.IMAGE} place-card__image-wrapper`}>
        <Link onClick={mouseClickLinkHandler} to={linkToDetail}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={mouseClickFavoriteButtonHandler}
            className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`}
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
            <span style={{width: `${rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link onClick={mouseClickLinkHandler} to={linkToDetail}>{title}</Link>
        </h2>
        <p className="place-card__type">{HotelType[type]}</p>
      </div>
    </article>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCard: (id) => dispatch(ActionCreator.setSelectedCardId(id)),
    sendFavoriteStatus: (id) => dispatch(FavoriteOperation.sendFavoriteStatus(id))
  };
};

export const MemoizedOfferSmallCard = connect(mapStateToProps, mapDispatchToProps)(React.memo(OfferSmallCard));

export default connect(mapStateToProps, mapDispatchToProps)(OfferSmallCard);
