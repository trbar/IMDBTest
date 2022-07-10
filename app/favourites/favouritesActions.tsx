import store from '../configureStore';

import {SanitizedSearchResult, SearchState} from '../search/searchTypes';

import {FavouritesState} from '../favourites/favouritesTypes';

type State = {
  search: SearchState;
  favourites: FavouritesState;
};

export const addMovieOrShowToFavouritesAction = (item: SanitizedSearchResult) =>
  store.dispatch({type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES', payload: item});

export const removeMovieOrShowFromFavouritesAction = (id: string) =>
  store.dispatch({type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES', payload: id});

export const getAllMovieOrShowFavourites = () =>
  store.dispatch({type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES'});

export const selectFavourites = (state: State) => state.favourites;
