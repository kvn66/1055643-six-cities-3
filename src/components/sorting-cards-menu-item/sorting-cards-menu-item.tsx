import * as React from "react";
import {SORTING_METHODS} from "../../const";

type Props = {
  sortingMethod: number;
  selectedSortingMethod: number;
  tabIndex: number;
  setSortingMethod: (methodId: number) => void;
}

const SortingCardsMenuItem: React.FunctionComponent<Props> = (props: Props) => {
  const {sortingMethod, selectedSortingMethod, tabIndex, setSortingMethod} = props;

  const handleMenuItemClick = (): void => {
    setSortingMethod(sortingMethod);
  };

  return (
    <li onClick={handleMenuItemClick} className={`places__option ${selectedSortingMethod === sortingMethod ? `places__option--active` : ``}`} tabIndex={tabIndex}>{SORTING_METHODS[sortingMethod]}</li>
  );
};

export default SortingCardsMenuItem;
