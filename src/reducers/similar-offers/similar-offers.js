import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';

const initialState = {
  similarOffers: []
};

const ActionType = {
  LOAD_SIMILAR_OFFERS: `LOAD_SIMILAR_OFFERS`,
};

export const ActionCreator = {
  loadSimilarOffers: (similarOffers) => {
    return {
      type: ActionType.LOAD_SIMILAR_OFFERS,
      payload: similarOffers,
    };
  },
};

export const Operation = {
  loadSimilarOffers: (cardId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${cardId}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.loadSimilarOffers(toCamel(response.data)));
      });
  },
};

const similarOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_SIMILAR_OFFERS:
      return extend(state, {
        similarOffers: action.payload,
      });
    default:
      return state;
  }
};

export default similarOffersReducer;
