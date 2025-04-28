import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalTextStyles} from '../../styles/TextStyles';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import {Colors} from '../../constants/Colors';
import GoalProgressIndicator from '../../components/GoalProgressIndicator';
import Icon from 'react-native-vector-icons/Ionicons'; //no error
import Divider from '../../components/Divider';
import Button from '../../components/buttons/Button';
import ReadingNowBook from '../../components/ReadingNowBook';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import {signout} from '../../firebase/auth/SignOut';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodayToReadingHistory,
  reset,
  updateTodaysReadingTime,
} from '../../state/slices/user_data/UserDataSlice';
import {
  checkTodaysReadingHistoryFirestore,
  getTodaysReadingTimeFirestore,
} from '../../firebase/firestore/FirestoreFunctions';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function HomeScreen({navigation}: any) {
  const userId = useSelector(state => state.userDataState.userId);
  const dispatch = useDispatch();

  //checking for today's progress
  useEffect(() => {
    //TODO: run function depending on stopwatch val or smthng
    const readingHistoryCheck = async () => {
      const todayExists = await checkTodaysReadingHistoryFirestore(userId);
      if (!todayExists) {
        console.log(todayExists);
        console.log("today doesn't exist, adding to firestore!");
        dispatch(addTodayToReadingHistory());
      } else {
        const todaysReadingTime = await getTodaysReadingTimeFirestore(userId);
        if (todaysReadingTime) {
          console.log('todays reading time: ', todaysReadingTime);
          dispatch(updateTodaysReadingTime(todaysReadingTime));
        }
      }
    };
    readingHistoryCheck();
  }, []);
  const todaysReadingTime = useSelector(state =>
    state.userDataState.readingHistory.length > 0
      ? state.userDataState.readingHistory[
          state.userDataState.readingHistory.length - 1
        ].readingTime
      : 0,
  );

  //currently reading books
  const currentlyReading = useSelector((state:any) => state.userDataState.currentlyReading);

  type currentBook = {
    isbn: string,
    startDate: string, 
    totalPages: number,
    timeRead: number,
    readPages: number,
    progress: number,
    title: string, //get from api
    author: string,
    coverUrl: string,
  }

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
        <View style={homeScreenStyles.topHeader}>
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
            <Text
              style={{
                ...homeScreenStyles.goalText,
                ...globalTextStyles.headerText,
              }}>
              {today === selectedDate ? "Today's Goal" : 'Goal'}
            </Text>
          </View>
          <View style={homeScreenStyles.goalProgressIndicatorContainer}>
            <GoalProgressIndicator />
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
            Currently Reading
          </Text>
          <Button
            title="+ Book"
            onPressFtn={() => navigation.navigate('Search Book')}
          />
          {/* book section */}
          <View style={homeScreenStyles.bookSection}>
            <ScrollView> 
             {currentlyReading.map((book:any ) => { //TODO: add types
             console.log(book);
                return (
                  <ReadingNowBook 
                  title='hello'
                  author='author'
                  progress={book.progress} />
                )
             })}
            </ScrollView>
          </View>
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
