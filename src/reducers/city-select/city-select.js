import {extend} from "../../utils.js";

const INITIAL_CITY_ID = 0;

const initialState = {
  cityName: INITIAL_CITY_ID,
};

export const ActionType = {
  SET_CITY_ID: `SET_CITY_ID`,
};

export const ActionCreator = {
  setSelectedCityId: (id) => {
    return {
      type: ActionType.SET_CITY_ID,
      payload: id,
    };
  },
};

const citySelectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY_ID:
      return extend(state, {
        cityName: action.payload,
      });
    default:
      return state;
  }
};

export default citySelectReducer;
