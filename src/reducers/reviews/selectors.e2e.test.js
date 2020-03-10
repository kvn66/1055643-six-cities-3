import {getReviews} from "./selectors";
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
    reviews
  },
};

it(`getReviews should return reviews`, () => {
  expect(getReviews(store)).toEqual(reviews);
});
