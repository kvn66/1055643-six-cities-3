import React from 'react';
import renderer from 'react-test-renderer';
import SortingCardsMenuItem from "./sorting-cards-menu-item.jsx";

it(`Render SortingCardsMenuItem`, () => {
  const tree = renderer
    .create(
        <SortingCardsMenuItem
          sortingMethod={0}
          selectedSortingMethod={0}
          setSortingMethod={() =>{}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
