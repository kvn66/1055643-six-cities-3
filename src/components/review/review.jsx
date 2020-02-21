import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

const Review = (props) => {
  const {review} = props;
  const {name, avatar, date, text} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar" src={avatar} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `80%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={date.format(`YYYY-MM-DD`)}>{date.format(`MMMM YYYY`)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(moment).isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Review;
