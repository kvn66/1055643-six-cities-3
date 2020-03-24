import {combineReducers} from "redux";
import {NameSpace} from "./name-space";
import cardsReducer from "./cards/cards";
import userReducer from "./user/user";
import citySelectReducer from "./city-select/city-select";
import cardSelectReducer from "./card-select/card-select";
import cardsSortingMenuReducer from "./cards-sorting-menu/cards-sorting-menu";
import reviewsReducer from "./reviews/reviews";
import similarOffersReducer from "./similar-offers/similar-offers";
import favoritesReducer from "./favorites/favorites";
import netErrorReducer from "./net-error/net-error";

const rootReducer = combineReducers({
  [NameSpace.CARDS]: cardsReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.CITY_SELECT]: citySelectReducer,
  [NameSpace.CARD_SELECT]: cardSelectReducer,
  [NameSpace.CARDS_SORTING_MENU]: cardsSortingMenuReducer,
  [NameSpace.REVIEWS]: reviewsReducer,
  [NameSpace.SIMILAR_OFFERS]: similarOffersReducer,
  [NameSpace.FAVORITES]: favoritesReducer,
  [NameSpace.NET_ERROR]: netErrorReducer,
});

export default rootReducer;
