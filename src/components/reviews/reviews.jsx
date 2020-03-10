import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {getReviews} from "../../reducers/reviews/selectors";
import {connect} from "react-redux";
import {Operation as ReviewsOperation} from "../../reducers/reviews/reviews";

class Reviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {cardId, loadReviews} = this.props;
    loadReviews(cardId);
  }

  render() {
    const {reviews} = this.props;

    const reviewslist = reviews.map((review) =>
      <Review key={review.id} review={review} />
    );
    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
        <ul className="reviews__list">
          {reviewslist}
        </ul>
        <form className="reviews__form form" action="#" method="post">
          <label className="reviews__label form__label" htmlFor="review">Your review</label>
          <div className="reviews__rating-form form__rating">
            <input
              className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
            />
            <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>

            <input
              className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
            />
            <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>

            <input
              className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
              type="radio"
            />
            <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>

            <input
              className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
              type="radio"
            />
            <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>

            <input
              className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
              type="radio"
            />
            <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </div>
          <textarea
            className="reviews__textarea form__textarea" id="review" name="review"
            placeholder="Tell how was your stay, what you like and what can be improved"
          />
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
              To submit review please make sure to set <span className="reviews__star">rating</span> and
              describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    reviews: getReviews(store),
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
  loadReviews: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
