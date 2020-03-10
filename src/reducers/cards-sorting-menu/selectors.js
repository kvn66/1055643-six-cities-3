import {NameSpace} from "../name-space.js";

const NAME_SPACE = NameSpace.CARDS_SORTING_MENU;

export const getSortingMethodId = (state) => {
  return state[NAME_SPACE].sortingMethodId;
};

export const getMenuState = (state) => {
  return state[NAME_SPACE].menuState;
};
