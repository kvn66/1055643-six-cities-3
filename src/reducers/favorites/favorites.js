import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';
import {AppRoute, NetworkError} from "../../const";
import {AuthorizationStatus} from "../user/user";
import {Operation as CardsOperation} from "../cards/cards.js";
import {getCard} from "../../utils";
import {NameSpace} from "../name-space";

const initialState = {
  favorites: [],
};

export const ActionType = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  SEND_FAVORITE_STATUS: `SEND_FAVORITE_STATUS`,
};

export const ActionCreator = {
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };
  },
};

export const Operation = {
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        debugger;
        dispatch(ActionCreator.loadFavorites(toCamel(response.data)));
      })
      .catch((err) => {
        const {response} = err;

        if (response && response.status === NetworkError.UNAUTHORIZED) {
          dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
          window.location.pathname = AppRoute.LOGIN;
          return;
        }

        throw err;
      });
  },
  sendFavoriteStatus: (cardId) => (dispatch, getState, api) => {
    const state = getState();
    const cards = state[NameSpace.CARDS].cards;
    const card = getCard(cardId, cards);
    const status = card.isFavorite ? 0 : 1;
    debugger;
    return api.post(`/favorite/${cardId}/${status}`, status)
      .then((response) => {
        debugger;
        CardsOperation.setFavoriteState(toCamel(response.data));
        Operation.loadFavorites();
      })
      .catch((err) => {
        const {response} = err;
        debugger;

        if (response && response.status === NetworkError.UNAUTHORIZED) {
          dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
          window.location.pathname = AppRoute.LOGIN;
          return;
        }

        throw err;
      });
  },
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.payload,
      });
    default:
      return state;
  }
};

export default favoritesReducer;
