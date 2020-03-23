import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';
import {LockState} from "../../const";

const initialState = {
  reviews: [],
  formIsLocked: LockState.UNLOCK,
  isError: false,
  rating: 0,
  comment: ``,
};

export const ActionType = {
  SAVE_REVIEWS: `SAVE_REVIEWS`,
  SET_FORM_LOCK_STATE: `SET_FORM_LOCK_STATE`,
  SET_ERROR_STATE: `SET_ERROR_STATE`,
  SET_RATING: `SET_RATING`,
  SET_COMMENT: `SET_COMMENT`,
};

export const ActionCreator = {
  saveReviews: (reviews) => {
    return {
      type: ActionType.SAVE_REVIEWS,
      payload: reviews,
    };
  },
  setFormLockState: (lockState) => {
    return {
      type: ActionType.SET_FORM_LOCK_STATE,
      payload: lockState,
    };
  },
  setErrorState: (errorState) => {
    return {
      type: ActionType.SET_ERROR_STATE,
      payload: errorState,
    };
  },
  setRating: (rating) => {
    return {
      type: ActionType.SET_RATING,
      payload: rating,
    };
  },
  setComment: (comment) => {
    return {
      type: ActionType.SET_COMMENT,
      payload: comment,
    };
  },
};

export const Operation = {
  loadReviews: (cardId) => (dispatch, getState, api) => {
    return api.get(`/comments/${cardId}`)
      .then((response) => {
        dispatch(ActionCreator.saveReviews(toCamel(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },
  sendReview: (cardId, review, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`/comments/${cardId}`, review)
      .then((response) => {
        dispatch(ActionCreator.saveReviews(toCamel(response.data)));
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
    case ActionType.SAVE_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.SET_FORM_LOCK_STATE:
      return extend(state, {
        formIsLocked: action.payload,
      });
    case ActionType.SET_ERROR_STATE:
      return extend(state, {
        isError: action.payload,
      });
    case ActionType.SET_RATING:
      return extend(state, {
        rating: action.payload,
      });
    case ActionType.SET_COMMENT:
      return extend(state, {
        comment: action.payload,
      });
    default:
      return state;
  }
};

export default reviewsReducer;
