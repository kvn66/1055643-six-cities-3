import {NameSpace} from "../name-space";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.FAVORITES;

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};

export const getCityNames = createSelector(
    getFavorites,
    (cards) => {
      let cityNames = cards.map((card) => card.city.name);
      const cityNamesSet = new Set(cityNames);
      cityNames = (Array.from(cityNamesSet)).sort();
      return cityNames;
    }
);

export const getSortedFavorites = createSelector(
    getFavorites,
    getCityNames,
    (cards, cities) => {
      return cities.map((cityName) => {
        return {
          city: cityName,
          cards: cards.filter((card) => card.city.name === cityName),
        };
      });
    }
);
