import {extend} from "./utils.js";
import {locations} from "./mocks/offers.js";

const INITIAL_CITY_ID = 0;

export const SET_SITY_ID = `SET_SITY_ID`;

const initialState = {
  cityId: INITIAL_CITY_ID,
  locations
};

export const setCityIdAction = (id) => ({
  type: SET_SITY_ID,
  payload: id,
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SITY_ID:
      return extend(state, {
        cityId: action.payload,
      });
    default:
      return state;
  }
};

export default rootReducer;
