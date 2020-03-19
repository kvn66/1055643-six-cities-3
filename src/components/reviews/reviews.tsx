import * as React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.tsx";
import ReviewForm from "../review-form/review-form.tsx";
import {getReviews} from "../../reducers/reviews/selectors";
import {connect} from "react-redux";
import {Operation as ReviewsOperation} from "../../reducers/reviews/reviews";
import {getAuthorizationStatus} from "../../reducers/user/selectors";

class Reviews extends React.PureComponent {
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

Reviews.propTypes = {
  cardId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.exact({
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
  ).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
