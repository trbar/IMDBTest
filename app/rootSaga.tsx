import {all} from 'redux-saga/effects';

import favouritesSagas from './favourites/favouritesSagas';
import searchSagas from './search/searchSagas';

export default function* rootSaga() {
  yield all([favouritesSagas(), searchSagas()]);
}
