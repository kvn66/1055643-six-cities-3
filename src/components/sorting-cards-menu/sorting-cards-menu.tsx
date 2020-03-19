import * as React from "react";
import PropTypes from 'prop-types';
import {ActionCreator} from "../../reducers/cards-sorting-menu/cards-sorting-menu";
import {connect} from "react-redux";
import SortingCardsMenuItem from "../sorting-cards-menu-item/sorting-cards-menu-item.jsx";
import {SORTING_METHODS} from "../../const";
import {getSortingMethodId, getMenuState} from "../../reducers/cards-sorting-menu/selectors";

const MenuState = {
  OPENED: true,
  CLOSED: false,
};

const SoringCardsMenu = (props) => {
  const {selectedSortingMethod, menuState, setSortingMethod, setMenuState} = props;

  const menuClickHandler = () => {
    setMenuState(!menuState);
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
    selectedSortingMethod: getSortingMethodId(store),
    menuState: getMenuState(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortingMethod: (methodId) => dispatch(ActionCreator.setSortingCardsMethod(methodId)),
    setMenuState: (state) => dispatch(ActionCreator.setMenuState(state))
  };
};

SoringCardsMenu.propTypes = {
  selectedSortingMethod: PropTypes.number.isRequired,
  menuState: PropTypes.bool.isRequired,
  setSortingMethod: PropTypes.func.isRequired,
  setMenuState: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SoringCardsMenu);
