import {combineReducers} from '@reduxjs/toolkit';

import searchReducer from './search/searchReducer';
import favouritesReducer from './favourites/favouritesReducer';

const rootReducer = combineReducers({
  search: searchReducer,
  favourites: favouritesReducer,
});

export default rootReducer;
