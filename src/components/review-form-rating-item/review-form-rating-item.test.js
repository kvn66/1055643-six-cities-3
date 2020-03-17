import React from 'react';
import renderer from 'react-test-renderer';
import {MemoizedReviewFormRatingItem} from "./review-form-rating-item.jsx";

it(`Render MemoizedReviewFormRatingItem`, () => {
  const tree = renderer
    .create(
        <MemoizedReviewFormRatingItem
          id={1}
          title={`terribly`}
          rating={4}
          formIsLocked={false}
          onChangeRating={()=>{}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
