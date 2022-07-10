import * as React from 'react';
import { Provider } from 'react-redux';

import store from './configureStore';
import Navigator from './navigator';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
