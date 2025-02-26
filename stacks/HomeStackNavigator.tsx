import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import StopwatchScreen from '../screens/home/StopwatchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/Colors';
import { globalStyleNumerics } from '../constants/StyleNumerics';

//nested navigator for home stack

const homeStack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <homeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <homeStack.Screen name="Home" component={HomeScreen} />
      <homeStack.Screen name="Stopwatch" component={StopwatchScreen} 
      // options={{
      //   headerShown: true,
      //   headerTitle: 'Track Your Reading',
      //   headerTitleStyle: {color: Colors.black, fontFamily: 'Rounded Mplus 1c Bold'},
      //   headerStyle: {backgroundColor: Colors.secondary},
      //   headerTintColor: Colors.black,
      //   headerBackButtonDisplayMode: 'minimal',
      //   headerShadowVisible: false,
      //   }} 
      />
    </homeStack.Navigator>
  );
}
