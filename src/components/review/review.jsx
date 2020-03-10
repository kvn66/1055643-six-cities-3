import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

const Review = (props) => {
  const {review} = props;
  const {date, comment, rating, user} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={moment(date).format(`YYYY-MM-DD`)}>{moment(date).format(`MMMM YYYY`)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.exact({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    user: PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired
    }).isRequired,
  }).isRequired
};

export default Review;
