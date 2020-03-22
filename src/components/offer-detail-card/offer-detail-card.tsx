import * as React from "react";
import {getCard, parseUrl} from "../../utils";
import CityMap from "../city-map/city-map";
import {MemoizedOfferSmallCard} from "../offer-small-card/offer-small-card";
import Reviews from "../reviews/reviews";
import {getSimilarOffers} from "../../reducers/similar-offers/selectors";
import {connect} from "react-redux";
import {getDetailCard} from "../../reducers/cards/selectors";
import {getDetailCardId} from "../../reducers/card-select/selectors";
import {Operation as SimilarOffersOperation} from "../../reducers/similar-offers/similar-offers";
import {MemoizedHeader} from "../header/header";
import {CardClassName, HotelType} from "../../const";
import {Operation as FavoriteOperation} from "../../reducers/favorites/favorites";
import {CardType} from "../../types";
import {UNSELECTED_CARD_ID} from "../../const";

const RADIX = 10;
const IMAGES_MIN = 0;
const IMAGES_MAX = 6;
const SECTION_CLASS_NAME = `property__map`;


type Props = {
  card: CardType;
  similarOffers: CardType[];
  detailCardId: number;
  loadSimilarOffers: (id: number) => void;
  sendFavoriteStatus: (id: number) => void;
}

class OfferDetailCard extends React.PureComponent<Props, {}> {
  private idParam: number;

  constructor(props) {
    super(props);

    this.mouseClickFavoriteButtonHandler = this.mouseClickFavoriteButtonHandler.bind(this);
  }

  mouseClickFavoriteButtonHandler(evt) {
    const {sendFavoriteStatus} = this.props;
    evt.preventDefault();
    sendFavoriteStatus(this.idParam);
  }

  componentDidMount() {
    const {detailCardId, loadSimilarOffers} = this.props;

    this.idParam = detailCardId;
    if (this.idParam === UNSELECTED_CARD_ID) {
      const url = parseUrl();
      if (url[0] === `offer` && url[1] !== ``) {
        this.idParam = parseInt(url[1], RADIX);
      }
    }

    loadSimilarOffers(this.idParam);
  }

  render() {
    const cardId = this.idParam;
    const {card, similarOffers} = this.props;

    if (!card) {
      return null;
    }

    const {images, price, title, description, type, bedrooms, maxAdults, rating, goods, isFavorite, isPremium, host} = card;
    const cardsElement = similarOffers.map((offer) =>
      <MemoizedOfferSmallCard key={offer.id} card={offer} className={CardClassName.DETAIL} />
    );

    return (
      <div className="page">
        <MemoizedHeader />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  images.map((image, index) =>
                    <div key={index} className="property__image-wrapper">
                      <img className="property__image" src={image} alt="Photo studio"/>
                    </div>
                  ).slice(IMAGES_MIN, IMAGES_MAX)
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button onClick={this.mouseClickFavoriteButtonHandler} className={`property__bookmark-button button ${isFavorite ? `property__bookmark-button--active` : ``}`} type="button">
                    <svg className="place-card__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${Math.round(rating) * 20}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating.toFixed(1)}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {HotelType[type]}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      goods.map((insideItem, index) =>
                        <li key={index} className="property__inside-item">
                          {insideItem}
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={`property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}
                    >
                      <img
                        className="property__avatar user__avatar" src={`/${host.avatarUrl}`} width="74" height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <Reviews cardId={cardId}/>
              </div>
            </div>
            <CityMap
              cards={cards}
              similarOffers={similarOffers}
              selectedCardId={cardId}
              isDetail={true}
              sectionClassName={SECTION_CLASS_NAME}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {cardsElement}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    card: getDetailCard(store),
    similarOffers: getSimilarOffers(store),
    detailCardId: getDetailCardId(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSimilarOffers: (id) => dispatch(SimilarOffersOperation.loadSimilarOffers(id)),
    sendFavoriteStatus: (id) => dispatch(FavoriteOperation.sendFavoriteStatus(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailCard);
