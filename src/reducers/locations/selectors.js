import {createSelector} from "reselect";
import NameSpace from "../name-space.js";


const CITIES_MAX_COUNT = 6;
const NAME_SPACE = NameSpace.LOCATIONS;

export const getLocations = (state) => {
  return state[NAME_SPACE].locations;
};

export const getLocationsCount = (state) => {
  return getLocations(state).length;
};

export const getCityNames = createSelector(
    getLocations,
    (locations) => {
      let cityNames = locations.map((location) => location.city.name);
      const cityNamesSet = new Set(cityNames);
      cityNames = Array.from(cityNamesSet);
      return cityNames.slice(0, CITIES_MAX_COUNT);
    }
);
