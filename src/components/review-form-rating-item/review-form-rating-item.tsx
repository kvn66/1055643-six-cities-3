import * as React from "react";
import PropTypes from 'prop-types';

const ReviewFormRatingItem = (props) => {
  const {id, title, rating, formIsLocked, onChangeRating} = props;

  return (
    <React.Fragment>
      <input
        onChange={onChangeRating}
        className="form__rating-input visually-hidden" name="rating" value={`${id}`} id={`${id}-stars`} type="radio"
        disabled={formIsLocked}
        checked={rating === id}
      />
      <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </React.Fragment>
  );
};

ReviewFormRatingItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  formIsLocked: PropTypes.bool.isRequired,
  onChangeRating: PropTypes.func.isRequired
};

export const MemoizedReviewFormRatingItem = React.memo(ReviewFormRatingItem);

export default ReviewFormRatingItem;
