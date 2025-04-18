import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import HomeScreen from '../screens/home/HomeScreen';
import HomeStackBottomTabNavigator from './HomeStackBottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';

const stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'}, 
        }}>
        <stack.Screen name="AuthStack" component={AuthStackNavigator} />
        <stack.Screen name="HomeStack" component={HomeStackNavigator} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
