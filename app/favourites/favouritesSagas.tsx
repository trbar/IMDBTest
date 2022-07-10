import {put, takeLatest, all, call, select} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {selectFavourites} from './favouritesActions';
import {selectSearch} from '../search/searchActions';

import {FavouritesState} from './favouritesTypes';

import {SearchState, SanitizedSearchResult} from '../search/searchTypes';

function* handleRemoveMovieOrShowFromFavourites({
  payload,
}: {
  type: string;
  payload: string;
}) {
  try {
    yield put({type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_REQUEST'});
    const favouriteState: FavouritesState = yield select(selectFavourites);
    const favouriteIds = favouriteState.ids;
    const favouriteResults = favouriteState.results;
    const newFavouriteIds = favouriteIds.filter(id => id != payload);
    const newFavouriteResults = favouriteResults.filter(
      result => result.id != payload,
    );
    yield all([
      call(
        AsyncStorage.setItem,
        '@IMDBTest.favouriteIds',
        JSON.stringify(newFavouriteIds),
      ),
      call(AsyncStorage.removeItem, `@IMDBTest.${payload}`),
    ]);
    yield put({
      type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_SUCCESS',
      payload: {results: newFavouriteResults, ids: newFavouriteIds},
    });
  } catch (error) {
    yield put({
      type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_FAILURE',
      payload: {error: error},
    });
  }
}

function* handleAddMovieOrShowToFavourites({
  payload,
}: {
  type: string;
  payload: SanitizedSearchResult;
}) {
  try {
    yield put({type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_REQUEST'});
    const favouriteState: FavouritesState = yield select(selectFavourites);
    const favouriteIds: string[] = favouriteState.ids;
    favouriteIds.push(payload.id);
    const favouriteResults: SanitizedSearchResult[] = favouriteState.results;
    favouriteResults.push(payload);
    yield all([
      call(
        AsyncStorage.setItem,
        '@IMDBTest.favouriteIds',
        JSON.stringify(favouriteIds),
      ),
      call(
        AsyncStorage.setItem,
        `@IMDBTest.${payload.id}`,
        JSON.stringify(payload),
      ),
    ]);
    const searchState: SearchState = yield select(selectSearch);
    const searchResultsWithoutMovieOrShowAddedToFavourites =
      searchState.results.filter(
        (result: SanitizedSearchResult) => result.id != payload.id,
      );
    yield put({
      type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_SUCCESS',
      payload: {
        favouriteResults: favouriteResults,
        ids: favouriteIds,
        searchResults: searchResultsWithoutMovieOrShowAddedToFavourites,
      },
    });
  } catch (error) {
    yield put({
      type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_FAILURE',
      payload: {error: error},
    });
  }
}

function* handleGetAllMoviesOrShowFavourites() {
  try {
    yield put({type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_REQUEST'});
    const jsonFavouriteIds: string | null = yield call(
      AsyncStorage.getItem,
      '@IMDBTest.favouriteIds',
    );
    const favouriteIds =
      jsonFavouriteIds != null ? JSON.parse(jsonFavouriteIds) : [];
    const favouriteResults: SanitizedSearchResult[] = [];
    yield all(
      favouriteIds.map(async (id: string) => {
        const jsonResult = await AsyncStorage.getItem(`@IMDBTest.${id}`);
        const result =
          jsonResult != null
            ? JSON.parse(jsonResult)
            : Error('Could not read result');
        favouriteResults.push(result);
      }),
    );
    yield put({
      type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_SUCCESS',
      payload: {results: favouriteResults, ids: favouriteIds},
    });
  } catch (error) {
    yield put({
      type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_FAILURE',
      payload: {error: error},
    });
  }
}

function* watchAddMovieOrShowToFavourites() {
  yield takeLatest(
    'ADD_MOVIE_OR_SHOW_TO_FAVOURITES',
    handleAddMovieOrShowToFavourites,
  );
}

function* watchRemoveMovieOrShowFromFavourites() {
  yield takeLatest(
    'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES',
    handleRemoveMovieOrShowFromFavourites,
  );
}

function* watchGetAllMovieOrShowFavourites() {
  yield takeLatest(
    'GET_ALL_MOVIES_OR_SHOW_FAVOURITES',
    handleGetAllMoviesOrShowFavourites,
  );
}

export default function* favouritesSagas() {
  yield all([
    watchAddMovieOrShowToFavourites(),
    watchRemoveMovieOrShowFromFavourites(),
    watchGetAllMovieOrShowFavourites(),
  ]);
}
