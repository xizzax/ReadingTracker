import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import {store} from './state/Store';
import AppNavigator from './stacks/AppNavigator';
import {Text, View} from 'react-native';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import AuthStackNavigator from './stacks/AuthStackNavigator';

function App(): React.JSX.Element {
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('user is: ', user);

    return subscriber;
  }, [user]);

  //DONE: reduc toolkit add
  return (
    <Provider store={store}>
      {user ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </Provider>
  );
}

export default App;
