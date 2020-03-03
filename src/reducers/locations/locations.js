import {extend} from "../../utils.js";

const initialState = {
  locations: []
};

const ActionType = {
  LOAD_LOCATIONS: `LOAD_LOCATIONS`,
};

export const ActionCreator = {
  loadLocations: (locations) => {
    return {
      type: ActionType.LOAD_LOCATIONS,
      payload: locations,
    };
  },
};

export const Operation = {
  loadLocations: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadLocations(response.data));
      });
  },
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_LOCATIONS:
      return extend(state, {
        locations: action.payload,
      });
    default:
      return state;
  }
};

export default locationsReducer;
