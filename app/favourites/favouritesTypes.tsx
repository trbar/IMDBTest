import {SanitizedSearchResult} from '../search/searchTypes';

export type FavouritesActions =
  | {type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES'; payload: SanitizedSearchResult}
  | {type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES'; payload: string}
  | {type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_REQUEST'}
  | {
      type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_SUCCESS';
      payload: {
        searchResults: Array<SanitizedSearchResult>;
        ids: Array<string>;
        favouriteResults: Array<SanitizedSearchResult>;
      };
    }
  | {type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_FAILURE'; payload: {error: Error}}
  | {type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_REQUEST'}
  | {
      type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_SUCCESS';
      payload: {results: Array<SanitizedSearchResult>; ids: Array<string>};
    }
  | {
      type: 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_FAILURE';
      payload: {error: Error};
    }
  | {type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES'}
  | {type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_REQUEST'}
  | {
      type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_SUCCESS';
      payload: {results: Array<SanitizedSearchResult>; ids: Array<string>};
    }
  | {
      type: 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_FAILURE';
      payload: {error: Error};
    };

export type FavouritesState = {
  results: Array<SanitizedSearchResult> | [];
  isLoading: boolean;
  error: null | Error;
  ids: Array<string> | [];
};
