import favoritesReducer, {ActionType, ActionCreator, Operation} from "./favorites";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";

const api = createAPI(() => {});

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

describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(favoritesReducer(void 0, {})).toEqual({
      favorites: [],
    });
  });

  it(`Reducer should save favorites`, () => {
    expect(favoritesReducer({
      favorites: [],
    }, {
      type: ActionType.SAVE_FAVORITES,
      payload: cards,
    })).toEqual({
      favorites: cards,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for saveFavorites step returns correct action`, () => {
    expect(ActionCreator.saveFavorites(cards)).toEqual({
      type: ActionType.SAVE_FAVORITES,
      payload: cards,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API GET call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SAVE_FAVORITES,
          payload: [{fake: true}],
        });
      });
  });
});
