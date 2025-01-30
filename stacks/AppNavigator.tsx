import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import HomeScreen from '../screens/home/HomeScreen';
import HomeStackNavigator from './HomeStackNavigator';

const stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'}, // setting app background to be white
        }}
        initialRouteName="Welcome">
        <stack.Screen name="Welcome" component={WelcomeScreen} />
        {/*TODO: make auth stack and add here*/}
        <stack.Screen name="HomeStack" component={HomeStackNavigator} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
