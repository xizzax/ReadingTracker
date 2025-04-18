import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import {NavigationContainer} from '@react-navigation/native';
import EmailSignInScreen from '../screens/auth/EmailSignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const authStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    // <NavigationContainer>
      <authStack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'},
        }}>
        <authStack.Screen name="Welcome" component={WelcomeScreen} />
        <authStack.Screen name="SignIn" component={SignInScreen} />
        <authStack.Screen
          name="EmailSignIn"
          component={EmailSignInScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerShadowVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: 'black',
          }}
        />
        <authStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerShadowVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: 'black',
          }}
        />
      </authStack.Navigator>
    // </NavigationContainer>
  );
}
