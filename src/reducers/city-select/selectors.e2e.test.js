import {getSelectedCityId} from "./selectors";
import {NameSpace} from "../name-space";

const store = {
  [NameSpace.CITY_SELECT]: {
    cityName: 0
  },
};

it(`getSelectedCityId should return cardId`, () => {
  expect(getSelectedCityId(store)).toEqual(0);
});
