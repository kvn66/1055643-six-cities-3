import userReducer, {ActionType, ActionCreator} from "./user";
import {Operation} from "../user/user";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import {AppRoute} from "../../const";

const api = createAPI(() => {});

const userInfo = {
  id: 1,
  name: `Oliver.conner`,
  email: `Oliver.conner@gmail.com`,
  avatarUrl: `/img/1.png`,
  isPro: false
};

const loginInfo = {
  email: `Oliver.conner@gmail.com`,
  password: 12345,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(userReducer(void 0, {})).toEqual({
    userAuthorized: false,
    userInfo: {
      id: -1,
      name: ``,
      email: ``,
      avatarUrl: ``,
      isPro: false
    },
  });
});

it(`Reducer should save userAuthorized`, () => {
  expect(userReducer({
    userAuthorized: false,
  }, {
    type: ActionType.SET_AUTHORIZATION_STATUS,
    payload: true,
  })).toEqual({
    userAuthorized: true,
  });
});

it(`Reducer should save userInfo`, () => {
  expect(userReducer({
    userInfo: {},
  }, {
    type: ActionType.SET_USER_INFO,
    payload: userInfo,
  })).toEqual({
    userInfo,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setAuthorizationStatus step returns correct action`, () => {
    expect(ActionCreator.setAuthorizationStatus(true)).toEqual({
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: true,
    });
  });
  it(`Action creator for setUserInfo step returns correct action`, () => {
    expect(ActionCreator.setUserInfo(userInfo)).toEqual({
      type: ActionType.SET_USER_INFO,
      payload: userInfo,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call GET to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userLoader = Operation.checkAuth();

    apiMock
      .onGet(AppRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return userLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_INFO,
          payload: [{fake: true}],
        });
      });
  });
  it(`Should make a correct API call POST to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userLoader = Operation.loginOnServer(loginInfo);

    apiMock
      .onPost(AppRoute.LOGIN, loginInfo)
      .reply(200, userInfo);

    return userLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_INFO,
          payload: userInfo,
        });
      });
  });
});
