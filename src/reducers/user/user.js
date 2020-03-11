import {toCamel} from "convert-keys";
import {AppRoute} from "../../const";

export const AuthorizationStatus = {
  AUTH: true,
  NO_AUTH: false,
};

const initialState = {
  userAuthorized: false,
  userInfo: {},
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
    return api.get(AppRoute.LOGIN)
      .then((response) => {
        dispatch(ActionCreator.setUserInfo(toCamel(response.data)));
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  loginOnServer: (authData) => (dispatch, getState, api) => {
    return api.post(AppRoute.LOGIN, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.setUserInfo(toCamel(response.data)));
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        window.location.pathname = AppRoute.ROOT;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default userReducer;
