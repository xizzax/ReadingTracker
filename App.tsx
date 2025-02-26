import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './stacks/AppNavigator';
import { store } from './state/Store';


function App(): React.JSX.Element {
  //DONE: reduc toolkit add
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
