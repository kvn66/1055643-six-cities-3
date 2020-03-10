import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';

const initialState = {
  reviews: []
};

export const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

export const ActionCreator = {
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
};

export const Operation = {
  loadReviews: (cardId) => (dispatch, getState, api) => {
    return api.get(`/comments/${cardId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(toCamel(response.data)));
      });
  },
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    default:
      return state;
  }
};

export default reviewsReducer;
