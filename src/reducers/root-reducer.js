import {combineReducers} from "redux";
import locationsReducer from "./locations/locations";
import userReducer from "./user/user";
import citySelectReducer from "./city-select/city-select";
import cardSelectReducer from "./card-select/card-select";
import cardsSortingMenuReducer from "./cards-sorting-menu/cards-sorting-menu";
import NameSpace from "./name-space";

const rootReducer = combineReducers({
  [NameSpace.LOCATIONS]: locationsReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.CITY_SELECT]: citySelectReducer,
  [NameSpace.CARD_SELECT]: cardSelectReducer,
  [NameSpace.CARDS_SORTING_MENU]: cardsSortingMenuReducer,
});

export default rootReducer;
