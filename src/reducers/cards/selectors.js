import {createSelector} from "reselect";
import {NameSpace} from "../name-space.js";
import {getSelectedCityId} from "../city-select/selectors";
import {getSortingMethodId} from "../cards-sorting-menu/selectors";


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

export const getSortedCardsForSelectedCity = createSelector(
    getCardsForSelectedCity,
    getSortingMethodId,
    (cards, sortingMethodId) => {
      let sortedCards = [];

      switch (sortingMethodId) {
        case 1:
          sortedCards = cards.slice().sort((a, b) => a.price - b.price);
          break;
        case 2:
          sortedCards = cards.slice().sort((a, b) => b.price - a.price);
          break;
        case 3:
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        default:
          sortedCards = cards.slice();
          break;
      }
      return sortedCards;
    }
);
