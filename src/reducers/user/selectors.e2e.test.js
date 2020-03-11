import {getAuthorizationStatus, getUserInfo} from "./selectors";
import {NameSpace} from "../name-space";

const userInfo = {
  id: 1,
  name: `Oliver.conner`,
  email: `Oliver.conner@gmail.com`,
  avatarUrl: `/img/1.png`,
  isPro: false
};

const store = {
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
};

it(`getAuthorizationStatus should return userAuthorized`, () => {
  expect(getAuthorizationStatus(store)).toEqual(false);
});

it(`getUserInfo should return userInfo`, () => {
  expect(getUserInfo(store)).toEqual(userInfo);
});
