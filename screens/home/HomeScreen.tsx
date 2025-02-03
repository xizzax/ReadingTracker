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
import PrimaryButton from '../../components/buttons/PrimaryButton';
import ReadingNowBook from '../../components/ReadingNowBook';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function HomeScreen() {
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

        <Pressable onPress={toggleVisibility}>
          <View style={homeScreenStyles.calendarButton}>
            <Icon name="calendar-outline" size={30} color={Colors.primary} />
          </View>
        </Pressable>

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
          <Icon name="play-outline" size={30} color={Colors.primary} /> 
          {/* TODO: dont show icon if not today */}
            <Text
              style={{
                ...homeScreenStyles.goalText,
                ...globalTextStyles.headerText,
              }}>
              {today === selectedDate ? "Today's Goal" : 'Goal'}
            </Text>
        </View>
          <GoalProgressIndicator
            goalTimeSeconds={14400}
            elapsedTimeSeconds={7600}
          />
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
          <PrimaryButton
            title="+ Book"
            onPressFtn={() => console.log('Add book')}
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
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
  }, //DONE:progress bar???
  goalTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },
  goalText: {},
  readingNowContainer: {
    alignItems: 'center',
    padding: 10,
    // borderWidth: 2,
    // borderColor: 'red',
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
