import {combineReducers} from "redux";
import cardsReducer from "./cards/cards";
import userReducer from "./user/user";
import citySelectReducer from "./city-select/city-select";
import cardSelectReducer from "./card-select/card-select";
import cardsSortingMenuReducer from "./cards-sorting-menu/cards-sorting-menu";
import reviewsReducer from "./reviews/reviews";
import NameSpace from "./name-space";

const rootReducer = combineReducers({
  [NameSpace.CARDS]: cardsReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.CITY_SELECT]: citySelectReducer,
  [NameSpace.CARD_SELECT]: cardSelectReducer,
  [NameSpace.CARDS_SORTING_MENU]: cardsSortingMenuReducer,
  [NameSpace.REVIEWS]: reviewsReducer,
});

export default rootReducer;
