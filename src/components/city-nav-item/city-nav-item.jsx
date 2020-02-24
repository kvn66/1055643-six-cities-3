import React from "react";
import PropTypes from 'prop-types';

const CityNavItem = (props) => {
  const {locations, setSelectedCity, cityId, selectedCityId} = props;

  const mouseClickHandler = (evt) => {
    evt.preventDefault();
    setSelectedCity(cityId);
  };

  return (
    <li className="locations__item">
      <a onClick={mouseClickHandler} className={`locations__item-link tabs__item ${selectedCityId === cityId ? `tabs__item--active` : ``}`} href="#">
        <span>{locations[cityId].city}</span>
      </a>
    </li>
  );
};

CityNavItem.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired,
  setSelectedCity: PropTypes.func.isRequired,
  cityId: PropTypes.number.isRequired,
  selectedCityId: PropTypes.number.isRequired
};

export default CityNavItem;
