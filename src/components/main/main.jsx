import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {UNSELECTED_CARD_ID} from "../../const.js";
import Cities from "../cities/cities.jsx";

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: UNSELECTED_CARD_ID,
    };

    this._setSelectedCard = this._setSelectedCard.bind(this);
  }

  _setSelectedCard(id) {
    this.setState({
      selectedCard: id,
    });
  }

  render() {
    const {locations} = this.props;

    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
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

        <Cities locations={locations} />

      </div>
    );
  }
}

Main.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired
};


export default Main;
