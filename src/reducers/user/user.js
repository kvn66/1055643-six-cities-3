import {toCamel} from "convert-keys";
import {NetworkError} from "../../const";
import {RequestRoute} from "../../const";

export const AuthorizationStatus = {
  AUTH: true,
  NO_AUTH: false,
};

const initialState = {
  userAuthorized: false,
  userInfo: {
    id: -1,
    name: ``,
    email: ``,
    avatarUrl: ``,
    isPro: false
  },
};

export const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SET_USER_INFO: `SET_USER_INFO`,
};

export const ActionCreator = {
  setAuthorizationStatus: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },
  setUserInfo: (userInfo) => {
    return {
      type: ActionType.SET_USER_INFO,
      payload: userInfo,
    };
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return Object.assign({}, state, {
        userAuthorized: action.payload,
      });
    case ActionType.SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    default:
      return state;
  }
};

export const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(RequestRoute.LOGIN)
      .then((response) => {
        dispatch(ActionCreator.setUserInfo(toCamel(response.data)));
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        const {response} = err;

        if (response && response.status === NetworkError.UNAUTHORIZED) {
          dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
          return;
        }

        throw err;
      });
  },

  loginOnServer: (authData) => (dispatch, getState, api) => {
    return api.post(RequestRoute.LOGIN, authData)
      .then((response) => {
        dispatch(ActionCreator.setUserInfo(toCamel(response.data)));
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default userReducer;
