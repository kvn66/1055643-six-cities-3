import React from "react";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {getPlace} from "../../utils";
import Map from "../map/map.jsx";
import OfferSmallCard from "../offer-small-card/offer-small-card.jsx";
import Reviews from "../reviews/reviews.jsx";
import {getSimilarOffers} from "../../utils";
import {connect} from "react-redux";

const RADIX = 10;
const SECTION_CLASS_NAME = `property__map`;


const OfferDetailCard = (props) => {
  const {id: idParam} = useParams();
  const cardId = idParam === undefined ? `0` : idParam;
  const {locations} = props;
  const {place, cityId} = getPlace(parseInt(cardId, RADIX), locations);
  const {id, images, priceValue, priceText, name, descriptions, type, bedrooms, adults, rating, inside, isPremium, owner, reviews} = place;
  const similarOffers = getSimilarOffers(cityId, locations, id, false);
  const cards = similarOffers.map((offerId) =>
    <OfferSmallCard key={offerId} place={getPlace(offerId, locations).place} setSelectedCard = {()=>{}} isDetail={true} />
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
          <Map locations={locations} cityId={cityId} similarOffers={similarOffers} activeOffer={id} sectionClassName={SECTION_CLASS_NAME}/>
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

const mapStateToProps = (store) => {
  return {
    locations: store.locations,
  };
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


export default connect(mapStateToProps)(OfferDetailCard);
