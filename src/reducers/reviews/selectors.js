import {NameSpace} from "../name-space.js";
import moment from 'moment';

const ReviewsCount = {
  MIN: 0,
  MAX: 10,
};

const NAME_SPACE = NameSpace.REVIEWS;

export const getReviews = (state) => {
  const reviews = state[NAME_SPACE].reviews;
  const sortedReviews = reviews.slice().sort((a, b) => moment(b.date).diff(moment(a.date)));
  return sortedReviews.slice(ReviewsCount.MIN, ReviewsCount.MAX);
};

export const getFormIsLocked = (state) => {
  return state[NAME_SPACE].formIsLocked;
};

export const getIsError = (state) => {
  return state[NAME_SPACE].isError;
};

export const getRating = (state) => {
  return state[NAME_SPACE].rating;
};

export const getComment = (state) => {
  return state[NAME_SPACE].comment;
};
