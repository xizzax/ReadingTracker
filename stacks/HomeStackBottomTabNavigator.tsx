import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import StopwatchScreen from '../screens/home/StopwatchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/Colors';
import {globalStyleNumerics} from '../constants/StyleNumerics';
import SearchBookScreen from '../screens/home/SearchBookScreen';
import {NavigationContainer} from '@react-navigation/native';
import UserProfileScreen from '../screens/home/UserProfile';
import StatsScreen from '../screens/home/StatsScreen';
import {TabBarButton} from '../components/buttons/TabBarButton';
import {StopwatchTabBarButton} from '../components/buttons/StopwatchTabBarButton';
import {View} from 'react-native';

//nested navigator for home stack

const homeStackTab = createBottomTabNavigator();

export default function HomeStackBottomTabNavigator() {
  return (
    <NavigationContainer>
      <homeStackTab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          headerTitle: '',
          headerShadowVisible: false, //TODO: move logout and calendar icons up??

          sceneStyle: {backgroundColor: 'white'}, // for all screens

          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.gray,
          tabBarShowLabel: false,

          tabBarButton: props => {
            return <TabBarButton {...props} />;
          },

          tabBarStyle: {
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 20,
            height: 60,
            marginHorizontal: 10,
            borderRadius: globalStyleNumerics.borderRadius,
            backgroundColor: Colors.lightGray,
            paddingBottom: 0,
          },

          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Search Book':
                iconName = 'search-outline';
                break;
              case 'Stopwatch':
                iconName = 'timer-outline';
                break;
              case 'Stats':
                iconName = 'trending-up-outline';
                break;
              case 'User':
                iconName = 'person-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }
            return (
                <View style={{ alignItems: 'center' }}>
                <Icon name={iconName} size={size} color={color} />
                {focused && (
                  <View
                  style={{
                    marginTop: 5,
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    backgroundColor: Colors.primary,
                  }}
                  />
                )}
                </View>
            );
          },
        })}>
        <homeStackTab.Screen name="Home" component={HomeScreen} />
        <homeStackTab.Screen name="Search Book" component={SearchBookScreen} />
        <homeStackTab.Screen
          name="Stopwatch"
          component={StopwatchScreen}
          options={{
            tabBarButton: props => (
              <StopwatchTabBarButton {...props}>
                <Icon name="play-outline" size={30} color={Colors.white} />
              </StopwatchTabBarButton>
            ),
          }}
        />
        <homeStackTab.Screen name="Stats" component={StatsScreen} />
        <homeStackTab.Screen name="User" component={UserProfileScreen} />
      </homeStackTab.Navigator>
    </NavigationContainer>
  );
}
