import {extend} from "../../utils.js";
import {UNSELECTED_CARD_ID} from "../../const";

export const ActionType = {
  SET_CARD_ID: `SET_CARD_ID`,
};

const initialState = {
  cardId: UNSELECTED_CARD_ID,
};

export const ActionCreator = {
  setSelectedCardId: (id) => {
    return {
      type: ActionType.SET_CARD_ID,
      payload: id,
    };
  },
};

const cardSelectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CARD_ID:
      return extend(state, {
        cardId: action.payload,
      });
    default:
      return state;
  }
};

export default cardSelectReducer;
