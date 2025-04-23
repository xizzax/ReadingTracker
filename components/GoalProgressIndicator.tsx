import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../constants/Colors';
import {screenDimensions} from '../constants/ScreenDimensions';
import {useState, useEffect} from 'react';
import {globalTextStyles} from '../styles/TextStyles';
import { useSelector } from 'react-redux';
import { totalSecondsToHHMMSS_string } from '../helper/TotalSecondsToHHMMSS';

export default function GoalProgressIndicator() {
  const goalTime = useSelector(state => state.userDataState.goal.currentGoal);
  const elapsedTime = useSelector(state => 
      state.userDataState.readingHistory.length > 0 
        ? state.userDataState.readingHistory[state.userDataState.readingHistory.length - 1].readingTime 
        : 0
    );

  return (
    <View style={goalProgressIndicatorStyles.container}>
      <AnimatedCircularProgress
        size={screenDimensions.height * 0.3}
        width={10}
        lineCap="round"
        fill={(elapsedTime / goalTime) * 100}
        tintColor={Colors.primary}
        arcSweepAngle={200}
        rotation={260}
        backgroundColor={Colors.lightGray}>
        {fill => (
          <View style={goalProgressIndicatorStyles.textContainer}>
            <Text
              style={{
                ...globalTextStyles.headerText,
                ...goalProgressIndicatorStyles.elapsedTimeText,
              }}>
              {totalSecondsToHHMMSS_string(elapsedTime).slice(0, 5)}
            </Text>
            <Text
              style={{
                ...globalTextStyles.bodyText,
                ...goalProgressIndicatorStyles.goalText,
              }}>
              of your {totalSecondsToHHMMSS_string(goalTime)} goal
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const goalProgressIndicatorStyles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  textContainer: {
    flex: 1,
    height: screenDimensions.height * 0.1,
    marginTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // borderWidth: 2,
    borderColor: 'red',
  },
  elapsedTimeText: {
    fontSize: 40,
  },
  goalText: {
    color: Colors.gray,
  },
});
