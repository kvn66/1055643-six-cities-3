import {getAllCards, getCardsCount, getCityNames, getSelectedCityName, getCardsForSelectedCity, getSortedCardsForSelectedCity} from "./selectors";
import {NameSpace} from "../name-space";
import {InitValue} from "../cards-sorting-menu/cards-sorting-menu";

const cards = [
  {
    id: 0,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 12,
      },
      name: `Amsterdam`,
    },
    bedrooms: 2,
    images: [`/img/apartment-01.jpg`, `/img/room.jpg`],
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    host: {
      id: 0,
      name: `Angelina`,
      avatarUrl: `/img/avatar-angelina.jpg`,
      isPro: true
    },
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    maxAdults: 3,
    previewImage: `/img/apartment-01.jpg`,
    price: 120,
    rating: 4.5,
    title: `Beautiful &amp; luxurious apartment at great location`,
    type: `apartment`,
  },
  {
    id: 1,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 12,
      },
      name: `Amsterdam`,
    },
    bedrooms: 2,
    images: [`/img/room.jpg`, `/img/apartment-02.jpg`],
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    host: {
      id: 0,
      name: `Angelina`,
      avatarUrl: `/img/avatar-angelina.jpg`,
      isPro: true
    },
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    maxAdults: 3,
    previewImage: `/img/room.jpg`,
    price: 120,
    rating: 4.5,
    title: `Beautiful &amp; luxurious apartment at great location`,
    type: `apartment`,
  }
];

const store = {
  [NameSpace.CARDS]: {
    cards
  },
  [NameSpace.USER]: {
    userAuthorized: false
  },
  [NameSpace.CITY_SELECT]: {
    cityName: 0
  },
  [NameSpace.CARD_SELECT]: {
    cardId: 0
  },
  [NameSpace.CARDS_SORTING_MENU]: {
    sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
    menuState: InitValue.INITIAL_MENU_STATE
  },
  [NameSpace.SIMILAR_OFFERS]: {
    similarOffers: [cards[1]]
  },
};

it(`getAllCards should return cards`, () => {
  expect(getAllCards(store)).toEqual(cards);
});

it(`getCardsCount should return 2`, () => {
  expect(getCardsCount(store)).toEqual(2);
});

it(`getCityNames should return [\`Amsterdam\`]`, () => {
  expect(getCityNames(store)).toEqual([`Amsterdam`]);
});

it(`getSelectedCityName should return Amsterdam`, () => {
  expect(getSelectedCityName(store)).toEqual(`Amsterdam`);
});

it(`getCardsForSelectedCity should return cards`, () => {
  expect(getCardsForSelectedCity(store)).toEqual(cards);
});

it(`getSortedCardsForSelectedCity should return cards`, () => {
  expect(getSortedCardsForSelectedCity(store)).toEqual(cards);
});
