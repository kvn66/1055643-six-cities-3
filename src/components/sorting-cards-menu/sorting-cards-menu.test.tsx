import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SoringCardsMenu from "./sorting-cards-menu";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {InitValue} from "../../reducers/cards-sorting-menu/cards-sorting-menu";
import {NameSpace} from "../../reducers/name-space";

const mockStore = configureStore([]);
const testFn = jest.fn();

it(`Render SoringCardsMenu`, () => {
  const store = mockStore({
    [NameSpace.CARDS_SORTING_MENU]: {
      sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
      menuState: InitValue.INITIAL_MENU_STATE
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <SoringCardsMenu
            setSortingMethod={testFn}
            setMenuState={testFn}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
