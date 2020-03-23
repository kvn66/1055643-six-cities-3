import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoizedCityNavItem} from "./city-nav-item";
import {ReactTestRendererJSON} from "react-test-renderer";

const CITY_ID = 0;

it(`Render MemoizedCityNavItem`, () => {
  const dispatch: jest.Mock = jest.fn();
  const tree: ReactTestRendererJSON = renderer
    .create(
        <MemoizedCityNavItem
          city = {`Paris`}
          setSelectedCity = {dispatch}
          cityId = {CITY_ID}
          selectedCityId = {CITY_ID}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
