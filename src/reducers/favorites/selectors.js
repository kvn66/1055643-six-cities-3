import {NameSpace} from "../name-space";

const NAME_SPACE = NameSpace.FAVORITES;

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};
