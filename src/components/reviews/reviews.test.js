import React from 'react';
import renderer from 'react-test-renderer';
import Reviews from "./reviews.jsx";

const reviews = [0, 1];

it(`Render Review`, () => {

  const tree = renderer
    .create(
        <Reviews
          reviews={reviews}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
