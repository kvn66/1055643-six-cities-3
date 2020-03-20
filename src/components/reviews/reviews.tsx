import * as React from "react";
import Review from "../review/review";
import ReviewForm from "../review-form/review-form";
import {getReviews} from "../../reducers/reviews/selectors";
import {connect} from "react-redux";
import {Operation as ReviewsOperation} from "../../reducers/reviews/reviews";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {ReviewType} from "../../types";

type Props = {
  cardId: number;
  reviews: ReviewType[];
  isAuthorized: boolean;
  loadReviews: (id: number) => void;
}

class Reviews extends React.PureComponent<Props, {}> {
  componentDidMount() {
    const {cardId, loadReviews} = this.props;
    loadReviews(cardId);
  }

  render() {
    const {cardId, reviews, isAuthorized} = this.props;

    const reviewslist = reviews.map((review) =>
      <Review key={review.id} review={review} />
    );
    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
        <ul className="reviews__list">
          {reviewslist}
        </ul>
        {isAuthorized &&
          <ReviewForm cardId={cardId} />
        }
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    reviews: getReviews(store),
    isAuthorized: getAuthorizationStatus(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: (id) => dispatch(ReviewsOperation.loadReviews(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
