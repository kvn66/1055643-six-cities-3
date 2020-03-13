import reviewsReducer, {ActionType, ActionCreator, Operation} from "./reviews";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";

const api = createAPI(() => {});

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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reviewsReducer(void 0, {})).toEqual({
    reviews: [],
  });
});

it(`Reducer should save reviews`, () => {
  expect(reviewsReducer({
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  })).toEqual({
    reviews,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setSelectedCityIdAction step returns correct action`, () => {
    expect(ActionCreator.loadReviews(reviews)).toEqual({
      type: ActionType.LOAD_REVIEWS,
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

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
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

    return reviewsSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });
  });
});
