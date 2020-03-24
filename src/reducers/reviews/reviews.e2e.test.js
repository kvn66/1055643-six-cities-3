import reviewsReducer, {ActionType, ActionCreator, Operation} from "./reviews";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";

const api = createAPI(jest.fn());

const reviews = [
  {
    id: 0,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
          The building is green and from 18th century.`,
    date: new Date(2020, 1, 14, 0, 0, 0, 0).toISOString(),
    rating: 4.5,
    user: {
      id: 0,
      name: `Max`,
      avatarUrl: `/img/avatar-max.jpg`,
      isPro: true
    },
  },
  {
    id: 1,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
          The building is green and from 18th century.`,
    date: new Date(2020, 0, 1, 0, 0, 0, 0).toISOString(),
    rating: 3.5,
    user: {
      id: 1,
      name: `Bob`,
      avatarUrl: `/img/avatar.svg`,
      isPro: true
    },
  }
];

const commentPost = {
  rating: 5,
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
          The building is green and from 18th century.`
};

describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reviewsReducer(void 0, {})).toEqual({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: ``,
    });
  });

  it(`Reducer should save reviews`, () => {
    expect(reviewsReducer({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: ``,
    }, {
      type: ActionType.SAVE_REVIEWS,
      payload: reviews,
    })).toEqual({
      reviews,
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: ``,
    });
  });

  it(`Reducer should save formIsLocked`, () => {
    expect(reviewsReducer({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: ``,
    }, {
      type: ActionType.SET_FORM_LOCK_STATE,
      payload: true,
    })).toEqual({
      reviews: [],
      formIsLocked: true,
      isError: false,
      rating: 0,
      comment: ``,
    });
  });

  it(`Reducer should save isShake`, () => {
    expect(reviewsReducer({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: ``,
    }, {
      type: ActionType.SET_ERROR_STATE,
      payload: true,
    })).toEqual({
      reviews: [],
      formIsLocked: false,
      isError: true,
      rating: 0,
      comment: ``,
    });
  });

  it(`Reducer should save rating`, () => {
    expect(reviewsReducer({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: ``,
    }, {
      type: ActionType.SET_RATING,
      payload: 5,
    })).toEqual({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 5,
      comment: ``,
    });
  });

  it(`Reducer should save comment`, () => {
    expect(reviewsReducer({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: ``,
    }, {
      type: ActionType.SET_COMMENT,
      payload: `test`,
    })).toEqual({
      reviews: [],
      formIsLocked: false,
      isError: false,
      rating: 0,
      comment: `test`,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for loadReviews step returns correct action`, () => {
    expect(ActionCreator.saveReviews(reviews)).toEqual({
      type: ActionType.SAVE_REVIEWS,
      payload: reviews,
    });
  });
  it(`Action creator for setFormLockState step returns correct action`, () => {
    expect(ActionCreator.setFormLockState(reviews)).toEqual({
      type: ActionType.SET_FORM_LOCK_STATE,
      payload: reviews,
    });
  });
  it(`Action creator for setShakeState step returns correct action`, () => {
    expect(ActionCreator.setErrorState(reviews)).toEqual({
      type: ActionType.SET_ERROR_STATE,
      payload: reviews,
    });
  });
  it(`Action creator for setRating step returns correct action`, () => {
    expect(ActionCreator.setRating(reviews)).toEqual({
      type: ActionType.SET_RATING,
      payload: reviews,
    });
  });
  it(`Action creator for setComment step returns correct action`, () => {
    expect(ActionCreator.setComment(reviews)).toEqual({
      type: ActionType.SET_COMMENT,
      payload: reviews,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API GET call to /comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(0);

    apiMock
      .onGet(`/comments/0`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SAVE_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });
  it(`Should make a correct API POST call to /comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const reviewsSender = Operation.sendReview(0, commentPost, onSuccess, onError);

    apiMock
      .onPost(`/comments/0`, commentPost)
      .reply(200, [{fake: true}]);

    return reviewsSender(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SAVE_REVIEWS,
          payload: [{fake: true}],
        });
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });
  });
});
