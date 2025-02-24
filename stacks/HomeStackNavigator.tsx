import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import StopwatchScreen from '../screens/home/TimerScreen';

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
      <homeStack.Screen name="Timer" component={StopwatchScreen} />
    </homeStack.Navigator>
  );
}
