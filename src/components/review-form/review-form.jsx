import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Operation as ReviewsOperation, ActionCreator} from "../../reducers/reviews/reviews";
import {connect} from "react-redux";
import {getFormIsLocked, getButtonIsLocked, getComment, getRating, getIsError} from "../../reducers/reviews/selectors";
import {MemoizedReviewFormRatingItem} from "../review-form-rating-item/review-form-rating-item.jsx";

const RADIX = 10;
const RATING_TITLES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];


class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this.changeRatingHandler = this.changeRatingHandler.bind(this);
    this.changeTextHandler = this.changeTextHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  setButtonState() {
    const {rating, comment, setButtonLockState} = this.props;
    const buttonState = !(rating > 0 && comment.length > 50 && comment.length < 500);
    setButtonLockState(buttonState);
  }

  clearForm() {
    const {setRating, setComment} = this.props;
    setRating(0);
    setComment(``);
  }

  onSuccess() {
    const {setErrorState} = this.props;
    setErrorState(false);
    this.clearForm();
  }

  onError() {
    const {setErrorState} = this.props;
    setErrorState(true);
  }

  changeRatingHandler(evt) {
    const {setRating} = this.props;
    setRating(parseInt(evt.target.value, RADIX));
  }

  changeTextHandler(evt) {
    const {setComment} = this.props;
    setComment(evt.target.value);
  }

  submitHandler(evt) {
    const {cardId, rating, comment, sendReview} = this.props;
    evt.preventDefault();
    const commentPost = {
      rating,
      comment
    };

    sendReview(cardId, commentPost, this.onSuccess, this.onError);
  }

  componentDidUpdate() {
    this.setButtonState();
  }

  componentWillUnmount() {
    this.clearForm();
  }

  render() {
    const {formIsLocked, buttonIsLocked, isError, rating, comment} = this.props;

    const ratingElement = RATING_TITLES.map((title, index) =>
      <MemoizedReviewFormRatingItem key={index} id={RATING_TITLES.length - index} title={title} rating={rating} formIsLocked={formIsLocked} onChangeRating={this.changeRatingHandler} />
    );

    return (
      <form
        onSubmit={this.submitHandler}
        className="reviews__form"
        action="#"
        method="post"
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {ratingElement}
        </div>
        <textarea
          onChange={this.changeTextHandler}
          className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          disabled={formIsLocked}
          value={comment}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={buttonIsLocked || formIsLocked}
            style={{backgroundColor: `${isError ? `#f00` : ``}`}}
          >Submit
          </button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  cardId: PropTypes.number.isRequired,
  formIsLocked: PropTypes.bool.isRequired,
  buttonIsLocked: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  sendReview: PropTypes.func.isRequired,
  setFormLockState: PropTypes.func.isRequired,
  setButtonLockState: PropTypes.func.isRequired,
  setErrorState: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    formIsLocked: getFormIsLocked(state),
    buttonIsLocked: getButtonIsLocked(state),
    isError: getIsError(state),
    rating: getRating(state),
    comment: getComment(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendReview: (cardId, review, onSuccess, onError) => dispatch(ReviewsOperation.sendReview(cardId, review, onSuccess, onError)),
    setFormLockState: (lockState) => dispatch(ActionCreator.setFormLockState(lockState)),
    setButtonLockState: (lockState) => dispatch(ActionCreator.setButtonLockState(lockState)),
    setErrorState: (lockState) => dispatch(ActionCreator.setErrorState(lockState)),
    setRating: (rating) => dispatch(ActionCreator.setRating(rating)),
    setComment: (comment) => dispatch(ActionCreator.setComment(comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
