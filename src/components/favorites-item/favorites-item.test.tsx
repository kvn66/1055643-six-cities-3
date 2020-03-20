import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoizedFavoritesItem} from "./favorites-item";
import {BrowserRouter} from "react-router-dom";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import {FavoritesForCityType} from "../../types";

const mockStore = configureMockStore();

const favoritesForCity: FavoritesForCityType = {
  city: `Amsterdam`,
  cards: [
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
  ]
};

it(`Render MemoizedFavoritesItem`, () => {

  const store = mockStore({});

  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <MemoizedFavoritesItem
              favoritesForCity={favoritesForCity}
            />
          </Provider>
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
