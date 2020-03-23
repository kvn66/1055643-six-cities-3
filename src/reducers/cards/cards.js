import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';

const initialState = {
  cards: []
};

export const ActionType = {
  SAVE_CARDS: `SAVE_CARDS`,
};

export const ActionCreator = {
  saveCards: (cards) => {
    return {
      type: ActionType.SAVE_CARDS,
      payload: cards,
    };
  },
};

export const Operation = {
  loadCards: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.saveCards(toCamel(response.data)));
      });
  },
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_CARDS:
      return extend(state, {
        cards: action.payload,
      });
    default:
      return state;
  }
};

export default cardsReducer;
