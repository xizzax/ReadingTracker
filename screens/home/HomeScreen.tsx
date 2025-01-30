import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Animated,
  Easing
} from 'react-native';
import React, {useState} from 'react';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalTextStyles} from '../../styles/TextStyles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import {Colors} from '../../constants/Colors';
import GoalProgressIndicator from '../../components/GoalProgressIndicator';
import {useEffect, useRef} from 'react';

export default function HomeScreen() {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const dropAnim = useRef(new Animated.Value(0)).current;

  const toggleVisibility = () => {
    if (calendarVisible) {
      // Hide the component with animation
      Animated.timing(dropAnim, {
        toValue: 0,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => setCalendarVisible(false));
    } else {
      // Show the component with animation
      setCalendarVisible(true);
      Animated.timing(dropAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  };

  // DATES
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [today, setToday] = useState(moment().format('YYYY-MM-DD'));

  return (
    <SafeAreaView>
      <Pressable onPress={toggleVisibility}>
        <View>
          <Text>Calendar</Text>
        </View>
      </Pressable>
       {/* divider */}
       <View style={homeScreenStyles.divider}>
        <Text> </Text>
      </View>

      {/* calendar bar */}
      {calendarVisible && (
        <Animated.View
          style={[
            {
              opacity: dropAnim,
              transform: [
                {
                  translateY: dropAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0], // Adjust this value to control the drop distance
                  }),
                },
              ],
            },
          ]}>
          <View style={homeScreenStyles.calendarBarContainer}>
            <CalendarList
              horizontal
              pagingEnabled
              futureScrollRange={0}
              hideExtraDays
              hideDayNames={true}
              firstDay={1} //monday start
              hideArrows={false}
              calendarHeight={screenDimensions.height * 0.1}
              theme={{
                selectedDayBackgroundColor: Colors.primary,
                todayTextColor: Colors.primary,
                selectedDayTextColor: 'white',
                textMonthFontWeight: 'bold',
                monthTextColor: Colors.gray,
                arrowColor: Colors.secondary,
                textDayFontSize: 14,
                textMonthFontSize: 14,
              }}
              onDayPress={day => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {selected: true},
              }}
            />
          </View>
        </Animated.View>
      )}

      {/* divider */}
      <View style={homeScreenStyles.divider}>
        <Text> </Text>
      </View>

      {/* goal section */}
      <View style={homeScreenStyles.goalSection}>
        <Text
          style={{
            ...homeScreenStyles.goalText,
            ...globalTextStyles.headerText,
          }}>
          {today === selectedDate ? "Today's Goal" : 'Goal'}
        </Text>
        <GoalProgressIndicator />
      </View>
    </SafeAreaView>
  );
}

const homeScreenStyles = StyleSheet.create({
  screen: {},
  calendarBarContainer: {
    // height: screenDimensions.height * 0.3,
    // borderWidth: 2,
    // borderColor: 'red',
  },

  divider: {
    backgroundColor: Colors.lightGray,
    height: screenDimensions.height * 0.025,
  },
  goalSection: {
    height: screenDimensions.height * 0.2,
    padding: 10,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
  }, //TODO:progress bar???
  goalText: {},
  readingNowHeaderContainer: {},
  readingNowHeader: {},
  bookSection: {},
  thisWeekHeader: {},
  thisWeekGraph: {}, //TODO: graph???
});
