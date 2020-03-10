import {NameSpace} from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].userAuthorized;
};

export const getUserInfo = (state) => {
  return state[NAME_SPACE].userInfo;
};
