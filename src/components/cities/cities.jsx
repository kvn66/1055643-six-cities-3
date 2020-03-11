import React from "react";
import PropTypes from 'prop-types';
import {getSelectedCityId} from "../../reducers/city-select/selectors";
import {getCityNames, getCardsCount} from "../../reducers/cards/selectors";
import {ActionCreator} from "../../reducers/city-select/city-select";
import City from "../city/city.jsx";
import {MemoizedCityNavItem} from "../city-nav-item/city-nav-item.jsx";
import {connect} from "react-redux";

const Cities = (props) => {
  const {cardsCount, cityNames, selectedCityId, setSelectedCity} = props;

  const cityNav = cityNames.map((cityName, index) =>
    <MemoizedCityNavItem key={index} city={cityName} setSelectedCity={setSelectedCity} cityId={index} selectedCityId={selectedCityId} />
  );

  return (
    <main className={`page__main page__main--index ${cardsCount ? `` : `page__main--index-empty`}`}>
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
    cardsCount: getCardsCount(store),
    cityNames: getCityNames(store),
    selectedCityId: getSelectedCityId(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCity: (id) => dispatch(ActionCreator.setSelectedCityId(id))
  };
};

Cities.propTypes = {
  cardsCount: PropTypes.number.isRequired,
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCityId: PropTypes.number.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Cities);
