import {NameSpace} from "../name-space";

const NAME_SPACE = NameSpace.NET_ERROR;

export const getNetErrorStatus = (state) => {
  return state[NAME_SPACE].isError;
};

export const getNetError = (state) => {
  return state[NAME_SPACE].netError;
};
