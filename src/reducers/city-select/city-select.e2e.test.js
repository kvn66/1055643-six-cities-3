import citySelectReducer, {SET_CITY_ID, setSelectedCityIdAction} from "./city-select";

const INITIAL_CITY_ID = 0;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(citySelectReducer(void 0, {})).toEqual({
    cityId: INITIAL_CITY_ID,
  });
});

it(`Reducer should save cityId`, () => {
  expect(citySelectReducer({
    cityId: 0,
  }, {
    type: SET_CITY_ID,
    payload: 1,
  })).toEqual({
    cityId: 1,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setSelectedCityIdAction step returns correct action`, () => {
    expect(setSelectedCityIdAction(2)).toEqual({
      type: SET_CITY_ID,
      payload: 2,
    });
  });
});
