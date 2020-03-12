import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {getCard, parseUrl} from "../../utils";
import Map from "../map/map.jsx";
import {MemoizedOfferSmallCard} from "../offer-small-card/offer-small-card.jsx";
import Reviews from "../reviews/reviews.jsx";
import {getSimilarOffers} from "../../reducers/similar-offers/selectors";
import {connect} from "react-redux";
import {getAllCards} from "../../reducers/cards/selectors";
import {Operation as SimilarOffersOperation} from "../../reducers/similar-offers/similar-offers";
import {MemoizedHeader} from "../header/header.jsx";

const RADIX = 10;
const SECTION_CLASS_NAME = `property__map`;


class OfferDetailCard extends PureComponent {
  constructor(props) {
    super(props);

    this.idParam = 0;
    const url = parseUrl();
    if (url[0] === `offer` && url[1] !== ``) {
      this.idParam = parseInt(url[1], RADIX);
    }
  }

  componentDidMount() {
    const {loadSimilarOffers} = this.props;
    loadSimilarOffers(this.idParam);
  }

  render() {
    const cardId = this.idParam;
    const {cards, similarOffers} = this.props;
    const card = getCard(cardId, cards);

    if (!card) {
      return null;
    }

    const {images, price, title, description, type, bedrooms, maxAdults, rating, goods, isPremium, host} = card;
    const cardsElement = similarOffers.map((offer) =>
      <MemoizedOfferSmallCard key={offer.id} card={offer} setSelectedCard={() => {}} isDetail={true} />
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
                  )
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
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${rating * 20}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating.toFixed(1)}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
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
            <Map
              cards={cards} similarOffers={similarOffers} selectedCardId={cardId} sectionClassName={SECTION_CLASS_NAME}
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
    cards: getAllCards(store),
    similarOffers: getSimilarOffers(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSimilarOffers: (id) => dispatch(SimilarOffersOperation.loadSimilarOffers(id))
  };
};

OfferDetailCard.propTypes = {
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
  similarOffers: PropTypes.arrayOf(
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
  loadSimilarOffers: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailCard);
