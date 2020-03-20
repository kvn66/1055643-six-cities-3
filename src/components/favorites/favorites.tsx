import * as React from "react";
import {Link} from "react-router-dom";
import {MemoizedFavoritesItem} from "../favorites-item/favorites-item";
import {Operation as FavoritesOperation} from "../../reducers/favorites/favorites";
import {connect} from "react-redux";
import {MemoizedHeader} from "../header/header";
import {getSortedFavorites} from "../../reducers/favorites/selectors";
import {AppRoute} from "../../const";
import {FavoritesForCityType} from "../../types";

type Props = {
  favorites: FavoritesForCityType[];
  loadFavorites: () => void;
}

class Favorites extends React.PureComponent<Props, {}> {
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
