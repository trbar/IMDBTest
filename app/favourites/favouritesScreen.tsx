import * as React from 'react';
import {View} from 'react-native';
import {
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';

import NoInternetStatusBar from '../common/components/NoInternetStatusBar';
import ErrorMessage from '../common/components/ErrorMessage';
import MovieOrShowList from '../common/components/MovieOrShowList';

import { getAllBlacklistedSearchResults } from '../search/searchActions';
import { getAllMovieOrShowFavourites, selectFavourites } from './favouritesActions';

import { MovieListProps } from '../common/components/MovieOrShowList';

const FavouritesScreen = ({navigation}: MovieListProps) => {
    React.useEffect(() => {
      getAllMovieOrShowFavourites();
      getAllBlacklistedSearchResults();
    }, []);
  
    const favourites = useSelector(selectFavourites);
  
    const netInfo = useNetInfo();
  
    return (
      <View style={{flex: 1}}>
        {!netInfo.isConnected && <NoInternetStatusBar />}
        {favourites.isLoading && (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        )}
        {favourites.error && (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ErrorMessage error={favourites.error} />
          </View>
        )}
        {favourites.results.length > 0 ? (
          <MovieOrShowList
            list={favourites.results}
            navigation={navigation}
            listType="favourites"
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Search movies to add to Favourites</Text>
          </View>
        )}
      </View>
    );
  };

export default FavouritesScreen