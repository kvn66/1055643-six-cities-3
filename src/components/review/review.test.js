import React from 'react';
import renderer from 'react-test-renderer';
import Review from "./review.jsx";

const review = {
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
};

it(`Render Review`, () => {

  const tree = renderer
    .create(
        <Review
          review={review}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
