import {createStackNavigator} from '@react-navigation/stack';
import SetGoalScreen from '../screens/home/SetGoalScreen';
import HomeStackBottomTabNavigator from './HomeStackBottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';

const homeStackNavigator = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <NavigationContainer>
      <homeStackNavigator.Navigator
        initialRouteName="SetGoal"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'white'},
        }}>
        {/* <homeStackNavigator.Screen name="Home" component={HomeScreen} /> */}
        <homeStackNavigator.Screen name="SetGoal" component={SetGoalScreen} />
        <homeStackNavigator.Screen
          name="HomeStackBottomTabNavigator"
          component={HomeStackBottomTabNavigator}
        />
      </homeStackNavigator.Navigator>
    </NavigationContainer>
  );
}
