import React from "react";
import PropTypes from 'prop-types';
import {setSelectedCityIdAction} from "../../reducers/city-select";
import City from "../city/city.jsx";
import MemoizedCityNavItem from "../city-nav-item/city-nav-item.jsx";
import {connect} from "react-redux";

const CITIES_MAX_COUNT = 6;

const Cities = (props) => {
  const {locations, selectedCityId, setSelectedCity} = props;

  const cityNav = locations.map((location, index) =>
    <MemoizedCityNavItem key={index} city={location.city} setSelectedCity={setSelectedCity} cityId={index} selectedCityId={selectedCityId} />
  );

  return (
    <main className={`page__main page__main--index ${locations[selectedCityId].places.length ? `` : `page__main--index-empty`}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cityNav}
          </ul>
        </section>
      </div>
      <City />
    </main>
  );
};

const mapStateToProps = (store) => {
  return {
    locations: store.locations.locations.slice(0, CITIES_MAX_COUNT),
    selectedCityId: store.citySelect.cityId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCity: (id) => dispatch(setSelectedCityIdAction(id))
  };
};

Cities.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired,
  selectedCityId: PropTypes.number.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Cities);
