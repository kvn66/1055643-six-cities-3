import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import City from "../city/city.jsx";
import CityNavItem from "../city-nav-item/city-nav-item.jsx";

const INITIAL_CITY_ID = 0;
const CITIES_MAX_COUNT = 6;

class Cities extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cityId: INITIAL_CITY_ID,
    };

    this._setSelectedCity = this._setSelectedCity.bind(this);
  }

  _setSelectedCity(id) {
    this.setState({
      cityId: id,
    });
  }

  render() {
    const {locations} = this.props;
    const cityNav = locations.slice(0, CITIES_MAX_COUNT).map((location, index) => <CityNavItem key={index} locations={locations} setSelectedCity={this._setSelectedCity} cityId={index} selectedCityId={this.state.cityId} />);

    return (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cityNav}
            </ul>
          </section>
        </div>
        <City locations={locations} cityId={this.state.cityId} />
      </main>
    );
  }
}

Cities.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired
};


export default Cities;
