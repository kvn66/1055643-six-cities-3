import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';
import {AppRoute} from "../../const";

const initialState = {
  reviews: []
};

export const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SEND_REVIEW: `SEND_REVIEW`,
};

export const ActionCreator = {
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  sendReview: (review) => {
    return {
      type: ActionType.SEND_REVIEW,
      payload: review,
    };
  },
};

export const Operation = {
  loadReviews: (cardId) => (dispatch, getState, api) => {
    return api.get(`${AppRoute.COMMENTS}/${cardId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(toCamel(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },
  sendReview: (cardId, review, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`${AppRoute.COMMENTS}/${cardId}`, review)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(toCamel(response.data)));
        onSuccess();
      })
      .catch((err) => {
        onError();
        throw err;
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
