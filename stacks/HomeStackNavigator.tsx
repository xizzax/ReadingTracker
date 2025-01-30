import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../screens/home/HomeScreen';

//nested navigator for home stack

const homeStack = createNativeStackNavigator();

export default function HomeStackNavigator(){
    return (
        <homeStack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
            <homeStack.Screen name="Home" component={HomeScreen} />
        </homeStack.Navigator> 
    );
}