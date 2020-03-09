import React from 'react';
import renderer from 'react-test-renderer';
import SoringCardsMenu from "./sorting-cards-menu.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {InitValue} from "../../reducers/cards-sorting-menu/cards-sorting-menu";
import NameSpace from "../../reducers/name-space";

const mockStore = configureStore([]);

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
            setSortingMethod={() =>{}}
            setMenuState={() =>{}}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
