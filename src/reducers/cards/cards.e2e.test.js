import cardsReducer from "./cards";
import {locations} from "../../mocks/offers.js";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(cardsReducer(void 0, {})).toEqual({
    locations: cards,
  });
});
