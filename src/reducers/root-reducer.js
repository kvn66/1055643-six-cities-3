import {combineReducers} from "redux";
import locationsReducer from "./locations";
import citySelectReducer from "./city-select";
import cardSelectReducer from "./card-select";
import cardsSortingMenuReducer from "./cards-sorting-menu";

const rootReducer = combineReducers({
  locations: locationsReducer,
  citySelect: citySelectReducer,
  cardSelect: cardSelectReducer,
  cardsSortingMenu: cardsSortingMenuReducer,
});

export default rootReducer;
