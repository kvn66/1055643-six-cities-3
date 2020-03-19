import * as React from "react";
import PropTypes from 'prop-types';

const CityNavItem = (props) => {
  const {city, setSelectedCity, cityId, selectedCityId} = props;

  const mouseClickHandler = (evt) => {
    evt.preventDefault();
    setSelectedCity(cityId);
  };

  return (
    <li className="locations__item">
      <a onClick={mouseClickHandler} className={`locations__item-link tabs__item ${selectedCityId === cityId ? `tabs__item--active` : ``}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
};

CityNavItem.propTypes = {
  city: PropTypes.string.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
  cityId: PropTypes.number.isRequired,
  selectedCityId: PropTypes.number.isRequired
};

export const MemoizedCityNavItem = React.memo(CityNavItem);

export default CityNavItem;
