import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.CITY_SELECT;

export const getSelectedCityId = (state) => {
  return state[NAME_SPACE].cityName;
};
