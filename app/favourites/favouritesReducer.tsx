import {FavouritesActions} from './favouritesTypes';
import {SanitizedSearchResult} from '../search/searchTypes';

const favouritesResults: SanitizedSearchResult[] = [];

const favouritesIds: string[] = [];

export const favouritesInitialState = {
  isLoading: false,
  error: null,
  results: favouritesResults,
  ids: favouritesIds,
};

export default function favouritesReducer(
  state = favouritesInitialState,
  action: FavouritesActions,
) {
  switch (action.type) {
    case 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES':
      return {
        ...state,
      };
    case 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES':
      return {
        ...state,
      };
    case 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_REQUEST':
    case 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_REQUEST':
    case 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_SUCCESS':
    case 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        results: action.payload.results,
        ids: action.payload.ids,
        error: null,
      };
    case 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        results: action.payload.favouriteResults,
        ids: action.payload.ids,
        error: null,
      };
    case 'REMOVE_MOVIE_OR_SHOW_FROM_FAVOURITES_FAILURE':
    case 'GET_ALL_MOVIES_OR_SHOW_FAVOURITES_FAILURE':
    case 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
