import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoizedReviewFormRatingItem} from "./review-form-rating-item";
import {ReactTestRendererJSON} from "react-test-renderer";

const testFn: jest.Mock = jest.fn();

it(`Render MemoizedReviewFormRatingItem`, () => {
  const tree: ReactTestRendererJSON = renderer
    .create(
        <MemoizedReviewFormRatingItem
          id={1}
          title={`terribly`}
          rating={4}
          formIsLocked={false}
          onChangeRating={testFn}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
