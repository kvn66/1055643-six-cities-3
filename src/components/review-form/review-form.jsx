import React, {createRef} from "react";
import PropTypes from "prop-types";
import {Operation as ReviewsOperation, ActionCreator} from "../../reducers/reviews/reviews";
import {connect} from "react-redux";
import {shakeElement} from "../../utils";
import {getFormIsLocked, getButtonIsLocked, getComment, getRating} from "../../reducers/reviews/selectors";
import {NameSpace} from "../../reducers/name-space";

const RADIX = 10;

const ReviewForm = (props) => {
  const {cardId, formIsLocked, buttonIsLocked, rating, comment, sendReview, setFormLockState, setButtonLockState, setRating, setComment} = props;
  const formRef = createRef();

  const setButtonState = () => {
    const buttonState = !(rating > 0 && comment.length > 5 && comment.length < 500);
    setButtonLockState(buttonState);
    console.log(buttonState);
    console.log(rating);
    console.log(comment);
    console.log(comment.length);
  };

  const lockForm = () => {
    formRef.current.querySelectorAll(`input, textarea, button`)
      .forEach((elem) => elem.setAttribute(`disabled`, `disabled`));
  };

  const unlockForm = () => {
    formRef.current.querySelectorAll(`input, textarea, button`)
      .forEach((elem) => elem.removeAttribute(`disabled`, `disabled`));
  };

  const clearForm = () => {
    formRef.current.reset();
    setRating(0);
    setComment(``);
    setButtonState();
  };

  const onSuccess = () => {
    unlockForm();
    clearForm();
  };

  const onError = () => {
    shakeElement(formRef.current);
    unlockForm();
  };

  const changeRatingHandler = (evt) => {
    setRating(parseInt(evt.target.value, RADIX));
    setButtonState();
  };

  const changeTextHandler = (evt) => {
    setComment(evt.target.value);
    setButtonState();
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    const commentPost = {
      rating,
      comment
    };

    lockForm();
    sendReview(cardId, commentPost, onSuccess, onError);
  };

  return (
    <form ref={formRef} onSubmit={submitHandler} className="reviews__form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={changeRatingHandler}
          className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={changeRatingHandler}
          className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={changeRatingHandler}
          className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
          type="radio"
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={changeRatingHandler}
          className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
          type="radio"
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={changeRatingHandler}
          className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
          type="radio"
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea onChange={changeTextHandler}
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={buttonIsLocked}>Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  cardId: PropTypes.number.isRequired,
  formIsLocked: PropTypes.bool.isRequired,
  buttonIsLocked: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  sendReview: PropTypes.func.isRequired,
  setFormLockState: PropTypes.func.isRequired,
  setButtonLockState: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state.REVIEWS);
  return {
    formIsLocked: getFormIsLocked(state),
    buttonIsLocked: getButtonIsLocked(state),
    rating: getRating(state),
    comment: state[NameSpace.REVIEWS].comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendReview: (cardId, review, onSuccess, onError) => dispatch(ReviewsOperation.sendReview(cardId, review, onSuccess, onError)),
    setFormLockState: (lockState) => dispatch(ActionCreator.setFormLockState(lockState)),
    setButtonLockState: (lockState) => dispatch(ActionCreator.setButtonLockState(lockState)),
    setRating: (rating) => dispatch(ActionCreator.setRating(rating)),
    setComment: (comment) => dispatch(ActionCreator.setComment(comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
