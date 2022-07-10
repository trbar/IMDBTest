import * as React from 'react';
import {Appbar} from 'react-native-paper';

const NoInternetStatusBar = () => {
  return (
    <Appbar.Header style={{backgroundColor: 'red', height: 56}}>
      <Appbar.Content title="No Internet Connection"></Appbar.Content>
    </Appbar.Header>
  );
};

export default NoInternetStatusBar;
