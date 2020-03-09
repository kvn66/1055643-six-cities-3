import citySelectReducer, {ActionType, ActionCreator} from "./city-select";

const INITIAL_CITY_ID = 0;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(citySelectReducer(void 0, {})).toEqual({
    cityName: INITIAL_CITY_ID,
  });
});

it(`Reducer should save cityId`, () => {
  expect(citySelectReducer({
    cityName: 0,
  }, {
    type: ActionType.SET_CITY_ID,
    payload: 1,
  })).toEqual({
    cityName: 1,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setSelectedCityIdAction step returns correct action`, () => {
    expect(ActionCreator.setSelectedCityId(2)).toEqual({
      type: ActionType.SET_CITY_ID,
      payload: 2,
    });
  });
});
