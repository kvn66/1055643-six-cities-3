import React from "react";
import PropTypes from 'prop-types';
import {SORTING_METHODS} from "../../const";

const SortingCardsMenuItem = (props) => {
  const {sortingMethod, selectedSortingMethod, setSortingMethod} = props;

  const mouseClickHandler = () => {
    setSortingMethod(sortingMethod);
  };

  return (
    <li onClick={mouseClickHandler} className={`places__option ${selectedSortingMethod === sortingMethod ? `places__option--active` : ``}`} tabIndex="0">{SORTING_METHODS[sortingMethod]}</li>
  );
};

SortingCardsMenuItem.propTypes = {
  sortingMethod: PropTypes.number.isRequired,
  selectedSortingMethod: PropTypes.number.isRequired,
  setSortingMethod: PropTypes.func.isRequired,
};

export default SortingCardsMenuItem;
