import React from "react";
import PropTypes from 'prop-types';
import {setSortingCardsMethodAction, setMenuStateAction} from "../../reducers/cards-sorting-menu";
import {connect} from "react-redux";
import SortingCardsMenuItem from "../sorting-cards-menu-item/sorting-cards-menu-item.jsx";
import {SORTING_METHODS} from "../../const";

const MenuState = {
  OPENED: true,
  CLOSED: false,
};

const SoringCardsMenu = (props) => {
  const {selectedSortingMethod, menuState, setSortingMethod, setMenuState} = props;

  const menuClickHandler = () => {
    const newState = !menuState;
    setMenuState(newState);
  };

  const changeSortingMethod = (sortingMethod) => {
    setSortingMethod(sortingMethod);
    setMenuState(MenuState.CLOSED);
  };

  const sortingCardsList = SORTING_METHODS.map((method, index) =>
    <SortingCardsMenuItem key={index} sortingMethod={index} selectedSortingMethod={selectedSortingMethod} setSortingMethod={changeSortingMethod} />
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={menuClickHandler} className="places__sorting-type" tabIndex="0">
        {SORTING_METHODS[selectedSortingMethod]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${menuState ? `places__options--opened` : ``}`}>
        {sortingCardsList}
      </ul>
    </form>
  );
};

const mapStateToProps = (store) => {
  return {
    selectedSortingMethod: store.cardsSortingMenu.sortingMethodId,
    menuState: store.cardsSortingMenu.menuState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortingMethod: (methodId) => dispatch(setSortingCardsMethodAction(methodId)),
    setMenuState: (state) => dispatch(setMenuStateAction(state))
  };
};

SoringCardsMenu.propTypes = {
  selectedSortingMethod: PropTypes.number.isRequired,
  menuState: PropTypes.bool.isRequired,
  setSortingMethod: PropTypes.func.isRequired,
  setMenuState: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SoringCardsMenu);
