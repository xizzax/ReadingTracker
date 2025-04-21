import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import { useSelector } from 'react-redux';

const appStack = createNativeStackNavigator();



export default function AppNavigator() {


  return (
    <NavigationContainer>
      <appStack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'},
        }}>
        <appStack.Screen name="AuthStack" component={AuthStackNavigator} />
        <appStack.Screen name="HomeStack" component={HomeStackNavigator} />
      </appStack.Navigator>
    </NavigationContainer>
  );
}
