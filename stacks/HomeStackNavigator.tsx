import {createStackNavigator} from '@react-navigation/stack';
import SetGoalScreen from '../screens/home/SetGoalScreen';
import HomeStackBottomTabNavigator from './HomeStackBottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const homeStackNavigator = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    // <NavigationContainer>
      <homeStackNavigator.Navigator
      initialRouteName='HomeStackBottomTabNavigator'
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'white'},
        }}>
        <homeStackNavigator.Screen name="SetGoal" component={SetGoalScreen} />
        <homeStackNavigator.Screen
          name="HomeStackBottomTabNavigator"
          component={HomeStackBottomTabNavigator}
        />
      </homeStackNavigator.Navigator>
    // </NavigationContainer>
  );
}
