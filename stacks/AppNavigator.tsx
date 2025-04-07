import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import HomeScreen from '../screens/home/HomeScreen';
import HomeStackBottomTabNavigator from './HomeStackBottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const stack = createNativeStackNavigator();
//TODO: get rid of this

type AppNavigatorProps = {
  stack: 'auth' | 'home';
};

export default function AppNavigator(props: AppNavigatorProps) {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'}, // setting app background to be white
        }}
        initialRouteName={props.stack === 'auth' ? 'AuthStack' : 'HomeStack'}>
        <stack.Screen name="AuthStack" component={AuthStackNavigator} />
        {/*DONE: make auth stack and add here*/}
        <stack.Screen name="HomeStack" component={HomeStackBottomTabNavigator} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
