import {NameSpace} from "../name-space.js";

const NAME_SPACE = NameSpace.SIMILAR_OFFERS;

export const getSimilarOffers = (state) => {
  return state[NAME_SPACE].similarOffers;
};
