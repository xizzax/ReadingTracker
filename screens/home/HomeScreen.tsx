import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalTextStyles} from '../../styles/TextStyles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import {Colors} from '../../constants/Colors';
import GoalProgressIndicator from '../../components/GoalProgressIndicator';
import Icon from 'react-native-vector-icons/Ionicons'; //no error
import Divider from '../../components/Divider';
import Button from '../../components/buttons/Button';
import ReadingNowBook from '../../components/ReadingNowBook';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import {signout} from '../../firebase/firebase_auth/SignOut';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function HomeScreen({navigation}: any) {
  // CALENDAR
  const [calendarVisible, setCalendarVisible] = useState(false);
  const toggleVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCalendarVisible(!calendarVisible);
  };

  // DATES
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [today, setToday] = useState(moment().format('YYYY-MM-DD'));

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <Icon name="moon-outline" size={30} color={Colors.primary} /> 
      TODO: add dark mode */}

        <View style={homeScreenStyles.topHeader}>
          <Pressable
            onPress={() => {
              console.log('logout goes here');
              signout();
            }}>
            <View style={homeScreenStyles.calendarButton}>
              <Icon
                name="log-out-outline"
                size={globalStyleNumerics.iconSize}
                color={Colors.primary}
              />
            </View>
          </Pressable>

          <Pressable onPress={toggleVisibility}>
            <View style={homeScreenStyles.calendarButton}>
              <Icon
                name="calendar-outline"
                size={globalStyleNumerics.iconSize}
                color={Colors.primary}
              />
            </View>
          </Pressable>
        </View>

        <Divider />

        {/* calendar bar */}
        <View style={homeScreenStyles.calendarBarContainer}>
          {calendarVisible && (
            <CalendarList //TODO: change calendar shows date behavior
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
          )}
        </View>

        <Divider />

        {/* goal section */}
        <View style={homeScreenStyles.goalSection}>
          <View style={homeScreenStyles.goalTextContainer}>
            {/* TODO: dont show icon if not today */}
            <Text
              style={{
                ...homeScreenStyles.goalText,
                ...globalTextStyles.headerText,
              }}>
              {today === selectedDate ? "Today's Goal" : 'Goal'}
            </Text>
            <Pressable //TODO: instead of this one, click on book to continue reading and log stats for that
              onPress={() => navigation.navigate('Stopwatch')}
              style={homeScreenStyles.playIconContainer}>
              <Icon
                name="play-outline"
                size={globalStyleNumerics.iconSize}
                color={Colors.primary}
              />
            </Pressable>
          </View>
          <View style={homeScreenStyles.goalProgressIndicatorContainer}>
            <GoalProgressIndicator
              goalTimeSeconds={14400}
              elapsedTimeSeconds={7600}
            />
          </View>
        </View>

        <Divider />

        {/* reading now header */}
        <View style={homeScreenStyles.readingNowContainer}>
          <Text
            style={{
              ...homeScreenStyles.readingNowHeader,
              ...globalTextStyles.headerText,
            }}>
            Reading Now
          </Text>
          <Button
            title="+ Book"
            onPressFtn={() => navigation.navigate('Search Book')}
          />
          {/* book section */}
          <View style={homeScreenStyles.bookSection}>
            <ScrollView>
              <ReadingNowBook
                title="Pride and Prejudice"
                author="Jane Austen"
                progress={50}
              />
              <ReadingNowBook
                title="The Great Gatsby"
                author="F. Scott Fitzgerald"
                progress={30}
              />
              <ReadingNowBook
                title="The Catcher in the Rye"
                author="J.D. Salinger"
                progress={10}
              />
            </ScrollView>
          </View>
        </View>

        <Divider />

        {/* this week header */}
        <View style={homeScreenStyles.thisWeekHeader}>
          <Text
            style={{
              ...homeScreenStyles.thisWeekHeader,
              ...globalTextStyles.headerText,
            }}>
            This Week
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const homeScreenStyles = StyleSheet.create({
  screen: {},
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarButton: {
    marginHorizontal: 5,
    marginBottom: 5,
    alignItems: 'flex-end',
    padding: 2,
  },
  calendarBarContainer: {
    // height: screenDimensions.height * 0.3,
    // borderWidth: 2,
    // borderColor: 'red',
  },

  goalSection: {
    height: screenDimensions.height * 0.22,
    padding: 10,
  }, //DONE:progress bar???
  goalTextContainer: {
    position: 'relative', // This allows absolutely positioned children relative to this container
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'center', // Center the Text horizontally within the container
    alignItems: 'center',
  },
  playIconContainer: {
    position: 'absolute', // Remove the icon from the normal flex flow
    right: 0,
  },
  goalProgressIndicatorContainer: {
    alignItems: 'center',
  },
  goalText: {},
  readingNowContainer: {
    alignItems: 'center',
    padding: 10,
  },
  readingNowHeader: {
    padding: 10,
    alignItems: 'center',
  },
  bookSection: {
    paddingVertical: 20,
    height: screenDimensions.height * 0.35,
  },
  thisWeekHeader: {
    padding: 10,
    alignItems: 'center',
  },
  thisWeekGraph: {}, //TODO: graph???
});
