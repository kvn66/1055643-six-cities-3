import * as React from "react";
import {ActionCreator} from "../../reducers/cards-sorting-menu/cards-sorting-menu";
import {connect} from "react-redux";
import SortingCardsMenuItem from "../sorting-cards-menu-item/sorting-cards-menu-item";
import {SORTING_METHODS} from "../../const";
import {getSortingMethodId, getMenuState} from "../../reducers/cards-sorting-menu/selectors";

const MenuState = {
  OPENED: true,
  CLOSED: false,
};

type Props = {
  selectedSortingMethod: number;
  menuState: boolean;
  setSortingMethod: (methodId: number) => void;
  setMenuState: (state: boolean) => void;
}

const SoringCardsMenu: React.FunctionComponent<Props> = (props: Props) => {
  const {selectedSortingMethod, menuState, setSortingMethod, setMenuState} = props;

  const menuClickHandler = (): void => {
    setMenuState(!menuState);
  };

  const changeSortingMethod = (sortingMethod: number) => {
    setSortingMethod(sortingMethod);
    setMenuState(MenuState.CLOSED);
  };

  const sortingCardsList = SORTING_METHODS.map((method, index) =>
    <SortingCardsMenuItem key={index} sortingMethod={index} selectedSortingMethod={selectedSortingMethod} tabIndex={index + 1} setSortingMethod={changeSortingMethod} />
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={menuClickHandler} className="places__sorting-type" tabIndex={0}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SoringCardsMenu);
