export const AuthorizationStatus = {
  AUTH: true,
  NO_AUTH: false,
};

const initialState = {
  userAuthorized: false,
};

const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
};

export const ActionCreator = {
  setAuthorizationStatus: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return Object.assign({}, state, {
        userAuthorized: action.payload,
      });
    default:
      return state;
  }
};

export const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
      });
  },
};

export default userReducer;
