import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {MemoizedFavoritesItem} from "../favorites-item/favorites-item.jsx";
import {Operation as FavoritesOperation} from "../../reducers/favorites/favorites";
import {connect} from "react-redux";
import {MemoizedHeader} from "../header/header.jsx";
import {getSortedFavorites} from "../../reducers/favorites/selectors";
import {AppRoute} from "../../const";

class Favorites extends PureComponent {
  componentDidMount() {
    const {loadFavorites} = this.props;
    loadFavorites();
  }

  render() {
    const {favorites} = this.props;
    const favoritesList = favorites.map((favoritesForCity) =>
      <MemoizedFavoritesItem key={favoritesForCity.city} favoritesForCity={favoritesForCity} />
    );

    return (
      <div className={`page ${favorites.length ? `` : `page--favorites-empty`}`}>
        <MemoizedHeader />

        {favorites.length ?
          (
            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {favoritesList}
                  </ul>
                </section>
              </div>
            </main>
          ) : (
            <main className="page__main page__main--favorites page__main--favorites-empty">
              <div className="page__favorites-container container">
                <section className="favorites favorites--empty">
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan yor
                      future trips.
                    </p>
                  </div>
                </section>
              </div>
            </main>
          )
        }
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.ROOT}>
            <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    favorites: getSortedFavorites(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFavorites: () => dispatch(FavoritesOperation.loadFavorites())
  };
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(
      PropTypes.exact({
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
      }).isRequired
  ).isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
