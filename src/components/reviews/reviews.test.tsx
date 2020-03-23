import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Reviews from "./reviews";
import configureMockStore from "redux-mock-store";
import {NameSpace} from "../../reducers/name-space";
import {Provider} from "react-redux";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import thunk from 'redux-thunk';
import {ReviewType} from "../../types";
import {ReactTestRendererJSON} from "react-test-renderer";

const testFn: jest.Mock = jest.fn();

const api = createAPI(testFn);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const reviews: ReviewType[] = [
  {
    id: 0,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
          The building is green and from 18th century.`,
    date: new Date(2020, 1, 14, 0, 0, 0, 0).toISOString(),
    rating: 4.5,
    user: {
      id: 0,
      name: `Max`,
      avatarUrl: `/img/avatar-max.jpg`,
      isPro: true
    },
  },
  {
    id: 1,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
          The building is green and from 18th century.`,
    date: new Date(2020, 0, 1, 0, 0, 0, 0).toISOString(),
    rating: 3.5,
    user: {
      id: 1,
      name: `Bob`,
      avatarUrl: `/img/avatar.svg`,
      isPro: true
    },
  }
];


it(`Render Review`, () => {
  const apiMock = new MockAdapter(api);

  apiMock
    .onGet(`/comments/0`)
    .reply(200, reviews);


  const store = mockStore({
    [NameSpace.REVIEWS]: {
      reviews
    },
    [NameSpace.USER]: {
      userAuthorized: false
    },
  });

  const tree: ReactTestRendererJSON = renderer
    .create(
        <Provider store={store}>
          <Reviews cardId={0} />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
