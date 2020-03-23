import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoizedCityNavItem} from "./city-nav-item";
import {ReactTestRendererJSON} from "react-test-renderer";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducers/name-space";
import {Provider} from "react-redux";

const CITY_ID = 0;

const mockStore = configureStore([]);

it(`Render MemoizedCityNavItem`, () => {
  const store = mockStore({
    [NameSpace.CITY_SELECT]: {
      cityName: 0
    },
  });

  const tree: ReactTestRendererJSON = renderer
    .create(
        <Provider store={store}>
          <MemoizedCityNavItem
            city = {`Paris`}
            cityId = {CITY_ID}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
