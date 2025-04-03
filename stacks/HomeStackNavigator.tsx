import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import StopwatchScreen from '../screens/home/StopwatchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/Colors';
import { globalStyleNumerics } from '../constants/StyleNumerics';
import SearchBookScreen from '../screens/home/SearchBookScreen';
import { NavigationContainer } from '@react-navigation/native';
import UserProfileScreen from '../screens/home/UserProfile';

//nested navigator for home stack

const homeStack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <NavigationContainer>
      <homeStack.Navigator
        // initialRouteName="Home"
        initialRouteName='User Profile'
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'},
        }}>
        <homeStack.Screen name="Home" component={HomeScreen} />
        <homeStack.Screen name="Stopwatch" component={StopwatchScreen} />
        <homeStack.Screen name="Search Book" component={SearchBookScreen} />
      <homeStack.Screen name="User Profile" component={UserProfileScreen} />
      </homeStack.Navigator>
    </NavigationContainer>
  );
}
