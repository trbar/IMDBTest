export type SanitizedSearchResult = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  rating: string;
};

export type SearchResult = {
  id: string;
  image: string;
  title: string;
  description: string;
  runtimeStr: string;
  genres: string;
  genreList: Array<{key: string; value: string}>;
  contentRating: string;
  imDbRating: string;
  imDbRatingVotes: string;
  metacriticRating: string;
  plot: string;
  stars: string;
  starList: Array<{id: string; name: string}>;
};

export type SearchState = {
    query: string;
    results: Array<SanitizedSearchResult> | [];
    isLoading: boolean;
    error: null | Error;
    blacklistedIds: Array<string> | [];
  };

  export type IMDBSearchResultResponse = {
    queryString: string;
    results: Array<SearchResult>;
    errorMessage: Error | null;
  };

export type SearchActions =
  | {type: 'IMDB_SEARCH_INPUT_CHANGED'; payload: string}
  | {type: 'IMDB_SEARCH_REQUEST'}
  | {type: 'IMDB_SEARCH_SUCCESS'; payload: Array<SanitizedSearchResult>}
  | {type: 'IMDB_SEARCH_FAILURE'; payload: Error}
  | {type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS'}
  | {type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_REQUEST'}
  | {
      type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_SUCCESS';
      payload: {blacklistedIds: Array<string>};
    }
  | {
      type: 'GET_ALL_BLACKLISTED_SEARCH_RESULTS_FAILURE';
      payload: {error: Error};
    }
  | {type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS'}
  | {type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_REQUEST'}
  | {
      type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_SUCCESS';
      payload: {
        blacklistedIds: Array<string>;
        results: Array<SanitizedSearchResult>;
      };
    }
  | {
      type: 'ADD_RESULT_TO_BLACKLISTED_SEARCH_RESULTS_FAILURE';
      payload: {error: Error};
    }
  | {
      type: 'ADD_MOVIE_OR_SHOW_TO_FAVOURITES_SUCCESS';
      payload: {
        searchResults: Array<SanitizedSearchResult>;
        ids: Array<string>;
        favouriteResults: Array<SanitizedSearchResult>;
      };
    };
