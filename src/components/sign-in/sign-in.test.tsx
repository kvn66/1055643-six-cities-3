import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SignIn from "./sign-in";
import configureMockStore from "redux-mock-store";
import {NameSpace} from "../../reducers/name-space";
import {Provider} from "react-redux";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import thunk from 'redux-thunk';
import {AppRoute} from "../../const";
import {BrowserRouter} from "react-router-dom";
import {CardType, AuthDataType, UserInfoType} from "../../types";
import {ReactTestRendererJSON} from "react-test-renderer";

const testFn: jest.Mock = jest.fn();

const api = createAPI(testFn);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const cards: CardType[] = [
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

const userInfo: UserInfoType = {
  id: 1,
  name: `Oliver.conner`,
  email: `Oliver.conner@gmail.com`,
  avatarUrl: `/img/1.png`,
  isPro: false
};

const loginInfo: AuthDataType = {
  email: `Oliver.conner@gmail.com`,
  password: `12345`,
};

it(`Render Review`, () => {
  const apiMock: MockAdapter = new MockAdapter(api);

  apiMock
    .onGet(AppRoute.LOGIN)
    .reply(200, userInfo);

  apiMock
    .onPost(AppRoute.LOGIN, loginInfo)
    .reply(200, userInfo);


  const store = mockStore({
    [NameSpace.CARDS]: {
      cards
    },
    [NameSpace.USER]: {
      userAuthorized: false,
      userInfo: {
        id: 1,
        name: `Oliver.conner`,
        email: `Oliver.conner@gmail.com`,
        avatarUrl: `/img/1.png`,
        isPro: false
      },
    },
    [NameSpace.CITY_SELECT]: {
      cityName: 0
    },
  });

  const tree: ReactTestRendererJSON = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <SignIn />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
