import {SearchActions, SanitizedSearchResult} from './searchTypes';

const searchResults: SanitizedSearchResult[] = [];

const searchBlacklistedIds: string[] = [];

export const searchInitialState = {
    query: '',
    results: searchResults,
    isLoading: false,
    error: null,
    blacklistedIds: searchBlacklistedIds,
  };

export default function searchReducer(state = searchInitialState, action: SearchActions) {
    switch (action.type) {
      case 'IMDB_SEARCH_INPUT_CHANGED':
        return {
          ...state,
          query: action.payload,
          isLoading: true,
        };
      case 'IMDB_SEARCH_REQUEST':
        return {
          ...state,
          results: [],
          isLoading: true,
          error: null,
        };
      case 'IMDB_SEARCH_SUCCESS':
        return {
          ...state,
          results: action.payload,
          isLoading: false,
          error: null,
        };
      case 'IMDB_SEARCH_FAILURE':
        return {
          ...state,
          results: [],
          isLoading: false,
          error: action.payload,
        };
      case 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_REQUEST':
      case 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          blacklistedIds: action.payload.blacklistedIds,
          error: null,
        };
      case 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          blacklistedIds: action.payload.blacklistedIds,
          results: action.payload.results,
          error: null,
        };
      case 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_FAILURE':
      case 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_SUCCESS':
        return {
          ...state,
          isLoading: false,
          results: action.payload.searchResults,
          error: null,
        };
      default:
        return state;
    }
  }