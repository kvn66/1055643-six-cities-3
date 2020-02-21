import {locations} from "./mocks/offers.js";

const initialState = {
  cityId: 0,
  locations
};

function rootReducer(state = initialState, action) {
  return state;
}

export default rootReducer;
