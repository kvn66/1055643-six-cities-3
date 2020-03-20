import * as React from "react";

type Props = {
  id: number;
  title: string;
  rating: number;
  formIsLocked: boolean;
  onChangeRating: (evt: { target: { value: string } }) => void;
}

const ReviewFormRatingItem: React.FunctionComponent<Props> = (props: Props) => {
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

export const MemoizedReviewFormRatingItem = React.memo(ReviewFormRatingItem);

export default ReviewFormRatingItem;
