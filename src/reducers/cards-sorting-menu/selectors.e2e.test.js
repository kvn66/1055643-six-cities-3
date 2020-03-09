import {getSortingMethodId, getMenuState} from "./selectors";
import NameSpace from "../name-space";
import {InitValue} from "./cards-sorting-menu";

const store = {
  [NameSpace.CARDS_SORTING_MENU]: {
    sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
    menuState: InitValue.INITIAL_MENU_STATE
  },
};

it(`getSortingMethodId should return cardId`, () => {
  expect(getSortingMethodId(store)).toEqual(InitValue.INITIAL_SORTING_METHOD_ID);
});

it(`getMenuState should return cardId`, () => {
  expect(getMenuState(store)).toEqual(InitValue.INITIAL_MENU_STATE);
});
