import store from '../configureStore';

import {SearchState} from '../search/searchTypes';

import {FavouritesState} from '../favourites/favouritesTypes';

type State = {
  search: SearchState;
  favourites: FavouritesState;
};

export const imdbSearchInputChangedAction = (query: string) =>
  store.dispatch({type: 'IMDB_SEARCH_INPUT_CHANGED', payload: query});

export const getAllBlacklistedSearchResults = () =>
  store.dispatch({type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS'});

export const addResultToBlacklistedSearchResults = (id: string) =>
  store.dispatch({
    type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS',
    payload: id,
  });

export const selectSearch = (state: State) => state.search;
