import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import WelcomeScreen from './screens/auth/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './stacks/AppNavigator';

function App(): React.JSX.Element {
  return <AppNavigator />;
}

export default App;
