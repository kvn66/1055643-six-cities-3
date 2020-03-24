import {extend} from "../../utils.js";
import {NetErrorStatus} from "../../const.js";

const initialState = {
  isError: NetErrorStatus.NO_ERROR,
  netError: ``,
};

export const ActionType = {
  SET_ERROR_STATUS: `SET_ERROR_STATUS`,
  SAVE_ERROR: `SAVE_ERROR`,
};

export const ActionCreator = {
  setNetErrorStatus: (status) => {
    return {
      type: ActionType.SET_ERROR_STATUS,
      payload: status,
    };
  },
  saveNetError: (error) => {
    return {
      type: ActionType.SAVE_ERROR,
      payload: error,
    };
  },
};

const netErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ERROR_STATUS:
      return extend(state, {
        isError: action.payload,
      });
    case ActionType.SAVE_ERROR:
      return extend(state, {
        netError: action.payload,
      });
    default:
      return state;
  }
};

export default netErrorReducer;
