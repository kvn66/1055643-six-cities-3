import React from "react";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {getPlace} from "../../util";
import Map from "../map/map.jsx";
import DetailOfferSmallCard from "../datail-offer-small-card/datail-offer-small-card.jsx";
import Reviews from "../reviews/reviews.jsx";

const RADIX = 10;

const SIMILAR_OFFERS = [0, 1, 2, 3];


const OfferDetailCard = (props) => {
  const {id: idParam} = useParams();
  const cardId = idParam === undefined ? `0` : idParam;
  const {locations} = props;
  const {place, cityId} = getPlace(parseInt(cardId, RADIX), locations);
  const {id, images, priceValue, priceText, name, descriptions, type, bedrooms, adults, rating, inside, isPremium, owner, reviews} = place;
  const cards = SIMILAR_OFFERS.map((offerId) =>
    <DetailOfferSmallCard key={offerId} place={getPlace(offerId, locations).place} />
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/#">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                  {name}
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
                  <span style={{width: `80%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{priceValue}</b>
                <span className="property__price-text">&nbsp;{priceText}</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    inside.map((insideItem, index) =>
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
                  <div className={`property__avatar-wrapper ${owner.isSuper ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img
                      className="property__avatar user__avatar" src={owner.avatar} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {owner.name}
                  </span>
                </div>
                <div className="property__description">
                  {
                    descriptions.map((description, index) =>
                      <p key={index} className="property__text">
                        {description}
                      </p>
                    )
                  }
                </div>
              </div>
              <Reviews reviews={reviews}/>
            </div>
          </div>
          <section className="property__map map">
            <Map locations={locations} cityId={cityId} similarOffers={SIMILAR_OFFERS} activeOffer={id}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {cards}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferDetailCard.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired
};


export default OfferDetailCard;
