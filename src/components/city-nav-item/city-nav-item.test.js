import React from 'react';
import renderer from 'react-test-renderer';
import MemoizedCityNavItem from "./city-nav-item.jsx";

const CITY_ID = 0;

it(`Render CityNavItem`, () => {
  const tree = renderer
    .create(
        <MemoizedCityNavItem
          city = {`Paris`}
          setSelectedCity = {() => {}}
          cityId = {CITY_ID}
          selectedCityId = {CITY_ID}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
