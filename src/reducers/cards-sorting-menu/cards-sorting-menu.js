import {extend} from "../../utils.js";

export const ActionType = {
  SET_MENU_STATE: `SET_MENU_STATE`,
  SET_SORTING_METHOD: `SET_SORTING_METHOD`,
};

export const InitValue = {
  INITIAL_SORTING_METHOD_ID: 0,
  INITIAL_MENU_STATE: false,
};

const initialState = {
  sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
  menuState: InitValue.INITIAL_MENU_STATE
};

export const ActionCreator = {
  setSortingCardsMethod: (methodId) => {
    return {
      type: ActionType.SET_SORTING_METHOD,
      payload: methodId,
    };
  },
  setMenuState: (state) => {
    return {
      type: ActionType.SET_MENU_STATE,
      payload: state,
    };
  },
};

const cardsSortingMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SORTING_METHOD:
      return extend(state, {
        sortingMethodId: action.payload,
      });
    case ActionType.SET_MENU_STATE:
      return extend(state, {
        menuState: action.payload,
      });
    default:
      return state;
  }
};

export default cardsSortingMenuReducer;
