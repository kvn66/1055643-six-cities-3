import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';

const initialState = {
  cards: []
};

export const ActionType = {
  LOAD_CARDS: `LOAD_CARDS`,
};

export const ActionCreator = {
  loadCards: (cards) => {
    return {
      type: ActionType.LOAD_CARDS,
      payload: cards,
    };
  },
};

export const Operation = {
  loadCards: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadCards(toCamel(response.data)));
      });
  },
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CARDS:
      return extend(state, {
        cards: action.payload,
      });
    default:
      return state;
  }
};

export default cardsReducer;
