import * as React from "react";
import {Operation as ReviewsOperation, ActionCreator} from "../../reducers/reviews/reviews";
import {connect} from "react-redux";
import {getFormIsLocked, getComment, getRating, getIsError} from "../../reducers/reviews/selectors";
import {MemoizedReviewFormRatingItem} from "../review-form-rating-item/review-form-rating-item";
import {LockState} from "../../const";
import {CommentPostType} from "../../types";

const RADIX = 10;
const RATING_TITLES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

type Props = {
  cardId: number;
  formIsLocked: boolean;
  buttonIsLocked: boolean;
  isError: boolean;
  rating: number;
  comment: string;
  sendReview: (cardId: number, review: CommentPostType, onSuccess: () => void, onError: () => void) => void;
  setFormLockState: (lockState: boolean) => void;
  setErrorState: (lockState: boolean) => void;
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
}

const ReviewForm: React.FunctionComponent<Props> = (props: Props) => {
  const lockForm = (): void => {
    const {setFormLockState} = props;
    setFormLockState(LockState.LOCK);
  };

  const unlockForm = (): void => {
    const {setFormLockState} = props;
    setFormLockState(LockState.UNLOCK);
  };

  const clearForm = (): void => {
    const {setRating, setComment} = props;
    setRating(0);
    setComment(``);
  };

  const onSuccess = (): void => {
    const {setErrorState} = props;
    setErrorState(false);
    unlockForm();
    clearForm();
  };

  const onError = (): void => {
    const {setErrorState} = props;
    setErrorState(true);
    unlockForm();
  };

  const handleRatingChange = (evt: { target: { value: string } }): void => {
    const {setRating} = props;
    setRating(parseInt(evt.target.value, RADIX));
  };

  const handleTextChange = (evt: { target: { value: string } }) => {
    const {setComment} = props;
    setComment(evt.target.value);
  };

  const handleSubmit = (evt: { preventDefault: () => void }): void => {
    const {cardId, rating, comment, sendReview} = props;
    evt.preventDefault();
    const commentPost = {
      rating,
      comment
    };

    lockForm();
    sendReview(cardId, commentPost, onSuccess, onError);
  };

  const {formIsLocked, buttonIsLocked, isError, rating, comment} = props;

  const ratingElement = RATING_TITLES.map((title, index) =>
    <MemoizedReviewFormRatingItem key={index} id={RATING_TITLES.length - index} title={title} rating={rating} formIsLocked={formIsLocked} onChangeRating={handleRatingChange} />
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="reviews__form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingElement}
      </div>
      <textarea
        onChange={handleTextChange}
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
};

const mapStateToProps = (state) => {
  const rating = getRating(state);
  const comment = getComment(state);
  const buttonIsLocked = !(rating > 0 && comment.length > 50 && comment.length < 500);
  return {
    formIsLocked: getFormIsLocked(state),
    buttonIsLocked,
    isError: getIsError(state),
    rating,
    comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendReview: (cardId, review, onSuccess, onError) => dispatch(ReviewsOperation.sendReview(cardId, review, onSuccess, onError)),
    setFormLockState: (lockState) => dispatch(ActionCreator.setFormLockState(lockState)),
    setErrorState: (lockState) => dispatch(ActionCreator.setErrorState(lockState)),
    setRating: (rating) => dispatch(ActionCreator.setRating(rating)),
    setComment: (comment) => dispatch(ActionCreator.setComment(comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
