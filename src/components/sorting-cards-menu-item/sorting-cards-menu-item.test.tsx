import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SortingCardsMenuItem from "./sorting-cards-menu-item";
import {ReactTestRendererJSON} from "react-test-renderer";

const testFn: jest.Mock = jest.fn();

it(`Render SortingCardsMenuItem`, () => {
  const tree: ReactTestRendererJSON = renderer
    .create(
        <SortingCardsMenuItem
          sortingMethod={0}
          selectedSortingMethod={0}
          tabIndex={0}
          setSortingMethod={testFn}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
