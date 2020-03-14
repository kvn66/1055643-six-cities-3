import {getReviews, getFormIsLocked, getButtonIsLocked, getIsShake, getRating, getComment} from "./selectors";
import {NameSpace} from "../name-space";

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

const store = {
  [NameSpace.REVIEWS]: {
    reviews,
    formIsLocked: false,
    buttonIsLocked: true,
    isShake: false,
    rating: 0,
    comment: `test`,
  },
};

it(`getReviews should return reviews`, () => {
  expect(getReviews(store)).toEqual(reviews);
});

it(`getFormIsLocked should return false`, () => {
  expect(getFormIsLocked(store)).toEqual(false);
});

it(`getButtonIsLocked should return true`, () => {
  expect(getButtonIsLocked(store)).toEqual(true);
});

it(`getIsShake should return false`, () => {
  expect(getIsShake(store)).toEqual(false);
});

it(`getRating should return 0`, () => {
  expect(getRating(store)).toEqual(0);
});

it(`getComment should return test`, () => {
  expect(getComment(store)).toEqual(`test`);
});
