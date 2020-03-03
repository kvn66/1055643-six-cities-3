import locationsReducer from "./locations";
import {locations} from "../../mocks/offers.js";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(locationsReducer(void 0, {})).toEqual({
    locations,
  });
});
