import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getSelectedCityId} from "../city-select/selectors";


const CITIES_MAX_COUNT = 6;
const NAME_SPACE = NameSpace.CARDS;

export const getAllCards = (state) => {
  return state[NAME_SPACE].cards;
};

export const getCardsCount = (state) => {
  return getAllCards(state).length;
};

export const getCityNames = createSelector(
    getAllCards,
    (cards) => {
      let cityNames = cards.map((card) => card.city.name);
      const cityNamesSet = new Set(cityNames);
      cityNames = Array.from(cityNamesSet);
      return cityNames.slice(0, CITIES_MAX_COUNT);
    }
);

export const getSelectedCityName = createSelector(
    getCityNames,
    getSelectedCityId,
    (cityNames, selectedCityId) => {
      return cityNames[selectedCityId];
    }
);

export const getCardsForSelectedCity = createSelector(
    getAllCards,
    getSelectedCityName,
    (cards, cityName) => {
      return cards.filter((card) => card.city.name === cityName);
    }
);
