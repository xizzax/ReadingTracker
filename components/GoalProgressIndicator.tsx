import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../constants/Colors';
import {screenDimensions} from '../constants/ScreenDimensions';
import {useState, useEffect} from 'react';
import {globalTextStyles} from '../styles/TextStyles';
import { useSelector } from 'react-redux';



export default function GoalProgressIndicator() {


  const goalTime = useSelector(state => state.userDataState.goal.currentGoal);

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
        fill={75}
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
              23:00
            </Text>
            <Text
              style={{
                ...globalTextStyles.bodyText,
                ...goalProgressIndicatorStyles.goalText,
              }}>
              of your 3 hour 2 minute goal
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
