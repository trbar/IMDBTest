import {delay, put, takeLatest, all, call, select} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {selectSearch} from './searchActions';
import { selectFavourites } from '../favourites/favouritesActions';

import {imdbApiKey} from '../../apikeys';

import {
  SearchResult,
  SanitizedSearchResult,
  IMDBSearchResultResponse,
  SearchState,
} from './searchTypes';

import {
  FavouritesState
} from '../favourites/favouritesTypes'

// function to extract necessary search results and remove blacklisted/favourite results
const sanitizedSearchResults = (
  searchResults: SearchResult[],
  blacklistedIds: string[],
  favouriteIds: string[],
) => {
  let sanitizedSearchResults: SanitizedSearchResult[] = [];
  searchResults.map((searchResult: SearchResult) => {
    // hide blacklisted results or results that are already in favourites
    if (
      !blacklistedIds.find(id => id == searchResult.id) &&
      !favouriteIds.find(id => id == searchResult.id)
    ) {
      let sanitizedSearchResult = {
        id: searchResult.id,
        title: searchResult.title,
        imageUrl: searchResult.image,
        description: searchResult.plot,
        rating: searchResult.imDbRating,
      };
      sanitizedSearchResults.push(sanitizedSearchResult);
    }
  });
  return sanitizedSearchResults;
};

function* handleSearchIMDBInput({payload}: {type: string; payload: string}) {
  //debouce for better search performance
  yield delay(1000);
  try {
    yield put({type: 'IMDB_SEARCH_REQUEST'});
    const response: Promise<Response> = yield call(
      fetch,
      `https://imdb-api.com/API/AdvancedSearch/${imdbApiKey}?title=${payload}&title_type=feature,tv_series&user_rating=1.0,10`,
    );
    const responseBody: IMDBSearchResultResponse = yield call([
      response,
      // @ts-ignore ignoring json is not on Response type due to missing typings
      response.json,
    ]);
    const searchState: SearchState = yield select(selectSearch);
    const blacklistedIds = searchState.blacklistedIds;
    const favouritesState: FavouritesState = yield select(selectFavourites);
    const favouriteIds = favouritesState.ids;
    yield put({
      type: 'IMDB_SEARCH_SUCCESS',
      payload: sanitizedSearchResults(
        responseBody.results,
        blacklistedIds,
        favouriteIds,
      ),
    });
  } catch (error) {
    yield put({type: 'IMDB_SEARCH_ERROR', payload: error});
  }
}

function* handleGetAllBlacklistedSearchResults() {
  try {
    yield put({type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_REQUEST'});
    const jsonBlacklistedSearchResultsIds: string | null = yield call(
      AsyncStorage.getItem,
      '@IMDBTest.blacklistedSearchResultIds',
    );
    const blacklistedSearchResultsIds =
      jsonBlacklistedSearchResultsIds != null
        ? JSON.parse(jsonBlacklistedSearchResultsIds)
        : [];
    yield put({
      type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_SUCCESS',
      payload: {blacklistedIds: blacklistedSearchResultsIds},
    });
  } catch (error) {
    yield put({
      type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_FAILURE',
      payload: {error: error},
    });
  }
}

function* handleAddResultToBlacklistedSearchResults({
  payload,
}: {
  type: string;
  payload: string;
}) {
  try {
    yield put({type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_REQUEST'});
    const searchState: SearchState = yield select(selectSearch);
    const blacklistedIds: string[] = searchState.blacklistedIds;
    blacklistedIds.push(payload);
    yield call(
      AsyncStorage.setItem,
      '@IMDBTest.blacklistedSearchResultIds',
      JSON.stringify(blacklistedIds),
    );
    const results = searchState.results.filter(
      (result: SanitizedSearchResult) => result.id != payload,
    );
    yield put({
      type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_SUCCESS',
      payload: {blacklistedIds: blacklistedIds, results: results},
    });
  } catch (error) {
    yield put({
      type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_FAILURE',
      payload: {error: error},
    });
  }
}

function* watchSearchIMDBInput() {
  yield takeLatest('IMDB_SEARCH_INPUT_CHANGED', handleSearchIMDBInput);
}

function* watchGetAllBlacklistedSearchResults() {
  yield takeLatest(
    'GET_ALL_BLACKLISTED_SEARCH_RESULTS',
    handleGetAllBlacklistedSearchResults,
  );
}

function* watchAddResultToBlacklistedSearchResults() {
  yield takeLatest(
    'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS',
    handleAddResultToBlacklistedSearchResults,
  );
}

export default function* searchSagas() {
  yield all([
    watchSearchIMDBInput(),
    watchGetAllBlacklistedSearchResults(),
    watchAddResultToBlacklistedSearchResults(),
  ]);
}
