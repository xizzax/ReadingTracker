import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../constants/Colors';
import {screenDimensions} from '../constants/ScreenDimensions';
import {useState, useEffect} from 'react';
import {globalTextStyles} from '../styles/TextStyles';
import { useSelector } from 'react-redux';
import { totalSecondsToHHMMSS_string } from '../helper/TotalSecondsToHHMMSS';

interface goalProgressIndicatorProps {
  elapsedTimeSeconds: number;
}

export default function GoalProgressIndicator(props: goalProgressIndicatorProps) {
  const goalTime = useSelector(state => state.userDataState.goal.currentGoal);

  // if(!todaysReadingTime){
  //   todaysReadingTime = "no";
  // }
  // const {goalTimeSeconds, elapsedTimeSeconds} = props;
  // const [fill, setFill] = useState(
  //   (elapsedTimeSeconds / goalTimeSeconds) * 100,
  // );

  // //TODO: see if it can be replaced with helper
  // //elapsed time minutes and hours
  // const elapsedTimeMinutes = Math.floor(elapsedTimeSeconds / 60);
  // const elapsedTimeHours = Math.floor(elapsedTimeMinutes / 60);
  // const elapsedTimeMinutesLeft = elapsedTimeMinutes % 60;

  // //goal time minutes and hours
  // const goalTimeMinutes = Math.floor(goalTimeSeconds / 60);
  // const goalTimeHours = Math.floor(goalTimeMinutes / 60);
  // const goalTimeMinutesLeft = goalTimeMinutes % 60;

  // useEffect(() => {
  //   setFill((elapsedTimeSeconds / goalTimeSeconds) * 100);
  // }, [elapsedTimeSeconds, goalTimeSeconds]);

  return (
    <View style={goalProgressIndicatorStyles.container}>
      <AnimatedCircularProgress
        size={screenDimensions.height * 0.3}
        width={10}
        lineCap="round"
        fill={(props.elapsedTimeSeconds / goalTime) * 100}
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
              {totalSecondsToHHMMSS_string(props.elapsedTimeSeconds).slice(0, 5)}
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
