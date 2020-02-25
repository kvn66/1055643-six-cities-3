import rootReducer, {SET_SITY_ID, setCityIdAction} from "./reducer.js";
import {locations} from "./mocks/offers.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(rootReducer(void 0, {})).toEqual({
    cityId: 0,
    locations
  });
});

it(`Reducer should save cityId`, () => {
  expect(rootReducer({
    cityId: 0,
    locations
  }, {
    type: SET_SITY_ID,
    payload: 1,
  })).toEqual({
    cityId: 1,
    locations
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setCityIdAction step returns correct action`, () => {
    expect(setCityIdAction(1)).toEqual({
      type: SET_SITY_ID,
      payload: 1,
    });
  });
});
