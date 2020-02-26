import {combineReducers} from 'redux';
import citySelectReducer from './city-select';
import locationsReducer from './locations';

const rootReducer = combineReducers({
  citySelect: citySelectReducer,
  locations: locationsReducer,
});

export default rootReducer;
