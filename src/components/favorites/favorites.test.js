import React from 'react';
import renderer from 'react-test-renderer';
import Favorites from "./favorites.jsx";
import configureMockStore from "redux-mock-store";
import {NameSpace} from "../../reducers/name-space";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import thunk from 'redux-thunk';

const api = createAPI(() => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const cards = [
  {
    id: 0,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 12,
      },
      name: `Amsterdam`,
    },
    bedrooms: 2,
    images: [`/img/apartment-01.jpg`, `/img/room.jpg`],
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    host: {
      id: 0,
      name: `Angelina`,
      avatarUrl: `/img/avatar-angelina.jpg`,
      isPro: true
    },
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    maxAdults: 3,
    previewImage: `/img/apartment-01.jpg`,
    price: 120,
    rating: 4.5,
    title: `Beautiful &amp; luxurious apartment at great location`,
    type: `apartment`,
  },
  {
    id: 1,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 12,
      },
      name: `Amsterdam`,
    },
    bedrooms: 2,
    images: [`/img/room.jpg`, `/img/apartment-02.jpg`],
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    host: {
      id: 0,
      name: `Angelina`,
      avatarUrl: `/img/avatar-angelina.jpg`,
      isPro: true
    },
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    maxAdults: 3,
    previewImage: `/img/room.jpg`,
    price: 120,
    rating: 4.5,
    title: `Beautiful &amp; luxurious apartment at great location`,
    type: `apartment`,
  }
];

it(`Render Favorites`, () => {
  const apiMock = new MockAdapter(api);

  apiMock
    .onGet(`/favorite`)
    .reply(200, cards);


  const store = mockStore({
    [NameSpace.FAVORITES]: {
      favorites: cards,
    },
    [NameSpace.USER]: {
      userAuthorized: true,
      userInfo: {
        id: 1,
        name: `Oliver.conner`,
        email: `Oliver.conner@gmail.com`,
        avatarUrl: `/img/1.png`,
        isPro: false
      },
    },
  });

  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <Favorites />
          </Provider>
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
