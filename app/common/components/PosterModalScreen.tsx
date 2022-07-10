import * as React from 'react';
import {View, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../navigator';

export type ShowPosterModalProps = NativeStackScreenProps<
  RootStackParamList,
  'ShowPosterModal'
>;

const PosterModalScreen = ({route}: ShowPosterModalProps) => {
  const {imageUrl} = route.params;

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{position: 'absolute'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {isLoading && <ActivityIndicator />}
        </View>
      </View>
      <Image
        style={{width: '100%', height: '100%'}}
        source={{uri: imageUrl}}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        resizeMode="contain"
      />
    </View>
  );
}

export default PosterModalScreen
