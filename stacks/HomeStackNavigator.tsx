import {createStackNavigator} from '@react-navigation/stack';
import SetGoalScreen from '../screens/home/SetGoalScreen';
import HomeStackBottomTabNavigator from './HomeStackBottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const homeStackNavigator = createStackNavigator();

export default function HomeStackNavigator() {
  const goalSet = useSelector(state => state.userDataState.goal.goalSet);
  console.log("goalset: ", goalSet);
  return (

    // <NavigationContainer>
      <homeStackNavigator.Navigator
      // initialRouteName='HomeStackBottomTabNavigator'
      initialRouteName={goalSet ? 'HomeStackBottomTabNavigator' : 'SetGoal'}
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
