import * as React from 'react';
import {View, FlatList} from 'react-native';
import {
  Button,
  Card,
  Title,
  Subheading,
  Paragraph,
  Text,
} from 'react-native-paper';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SanitizedSearchResult} from '../../search/searchTypes';

import {RootStackParamList} from '../../navigator';

import {
  addMovieOrShowToFavouritesAction,
  removeMovieOrShowFromFavouritesAction,
} from '../../favourites/favouritesActions';

import {addResultToBlacklistedSearchResults} from '../../search/searchActions';

export type MovieListProps = {
  list: Array<SanitizedSearchResult>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ShowPosterModal'>;
  listType: 'search' | 'favourites';
};

const MovieOrShowList = ({list, navigation, listType}: MovieListProps) => {
  const MovieOrShowCard = ({item}: {item: SanitizedSearchResult}) => {
    return (
      <Card
        mode="outlined"
        style={{margin: 5}}
        onPress={() =>
          navigation.navigate('ShowPosterModal', {imageUrl: item.imageUrl})
        }>
        <Card.Content>
          <Title>{item.title}</Title>
          <Subheading>IMBD Rating: {item.rating}</Subheading>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
        <Card.Actions
          style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          {listType === 'search' && (
            <View>
              <Button
                style={{marginBottom: 5}}
                mode="outlined"
                onPress={() => addMovieOrShowToFavouritesAction(item)}>
                Add To Favourites
              </Button>
              <Button
                mode="outlined"
                onPress={() => addResultToBlacklistedSearchResults(item.id)}>
                Hide From Search Results
              </Button>
            </View>
          )}
          {listType === 'favourites' && (
            <Button
              mode="outlined"
              onPress={() => removeMovieOrShowFromFavouritesAction(item.id)}>
              Remove From Favourites
            </Button>
          )}
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View>
      {list.length == 0 ? (
        <Text>No results found. Please search again</Text>
      ) : (
        <FlatList
          data={list}
          renderItem={item => <MovieOrShowCard item={item.item} />}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default MovieOrShowList;
