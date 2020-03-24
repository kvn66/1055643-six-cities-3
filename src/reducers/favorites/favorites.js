import {extend} from "../../utils.js";
import {toCamel} from 'convert-keys';
import {AppRoute, NetworkError, RequestRoute} from "../../const";
import {AuthorizationStatus, ActionCreator as UserCreator} from "../user/user";
import {ActionCreator as CardsCreator} from "../cards/cards";
import {ActionCreator as SimilarOffersCreator} from "../similar-offers/similar-offers";
import {getCard, getCardIndex, replaceCardInArray} from "../../utils";
import {getAllCards} from "../cards/selectors";
import {getSimilarOffers} from "../similar-offers/selectors";

const initialState = {
  favorites: [],
};

const applyFavoriteState = (card, dispatch, getState) => {
  const cards = getAllCards(getState());
  dispatch(CardsCreator.saveCards(replaceCardInArray(card, cards)));
  const similarOffers = getSimilarOffers(getState());
  if (getCardIndex(card.id, similarOffers) !== -1) {
    dispatch(SimilarOffersCreator.saveSimilarOffers(replaceCardInArray(card, similarOffers)));
  }
  dispatch(Operation.loadFavorites());
};

export const ActionType = {
  SAVE_FAVORITES: `SAVE_FAVORITES`,
};

export const ActionCreator = {
  saveFavorites: (favorites) => {
    return {
      type: ActionType.SAVE_FAVORITES,
      payload: favorites,
    };
  },
};

export const Operation = {
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(RequestRoute.FAVORITE)
      .then((response) => {
        dispatch(ActionCreator.saveFavorites(toCamel(response.data)));
      })
      .catch((err) => {
        const {response} = err;

        if (response && response.status === NetworkError.UNAUTHORIZED) {
          dispatch(UserCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
          window.location.pathname = AppRoute.LOGIN;
          return;
        }

        throw err;
      });
  },
  sendFavoriteStatus: (cardId) => (dispatch, getState, api) => {
    const cards = getAllCards(getState());
    const card = getCard(cardId, cards);
    const status = card.isFavorite ? 0 : 1;
    return api.post(`/favorite/${cardId}/${status}`, status)
      .then((response) => {
        applyFavoriteState(toCamel(response.data), dispatch, getState);
      })
      .catch((err) => {
        const {response} = err;

        if (response && response.status === NetworkError.UNAUTHORIZED) {
          dispatch(UserCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
          window.location.pathname = AppRoute.LOGIN;
          return;
        }

        throw err;
      });
  },
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_FAVORITES:
      return extend(state, {
        favorites: action.payload,
      });
    default:
      return state;
  }
};

export default favoritesReducer;
