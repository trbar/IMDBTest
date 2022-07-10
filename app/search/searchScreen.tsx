import * as React from 'react';
import {View} from 'react-native';
import {
  Searchbar,
  ActivityIndicator,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';

import NoInternetStatusBar from '../common/components/NoInternetStatusBar';
import ErrorMessage from '../common/components/ErrorMessage';
import MovieOrShowList from '../common/components/MovieOrShowList';

import { selectSearch, imdbSearchInputChangedAction } from './searchActions';

import { MovieListProps } from '../common/components/MovieOrShowList';

const SearchScreen = ({navigation}: MovieListProps) => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = (query: string) => {
      setSearchQuery(query);
      // prevent case when user clears the search box that a query with nothing will run
      if (query != '') {
        imdbSearchInputChangedAction(query);
      }
    };
  
    const search = useSelector(selectSearch);
    const netInfo = useNetInfo();
  
    return (
      <View style={{flex: 1}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        {!netInfo.isConnected && <NoInternetStatusBar />}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {search.isLoading ? (
            <ActivityIndicator />
          ) : (
            <MovieOrShowList
              list={search.results}
              navigation={navigation}
              listType="search"
            />
          )}
          {search.error && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ErrorMessage error={search.error} />
            </View>
          )}
        </View>
      </View>
    );
  };

  export default SearchScreen