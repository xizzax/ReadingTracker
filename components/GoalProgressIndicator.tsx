import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import {Colors} from '../constants/Colors';
import {screenDimensions} from '../constants/ScreenDimensions';
import {useState, useEffect} from 'react';
import {FlipInYLeft} from 'react-native-reanimated';
import {globalTextStyles} from '../styles/TextStyles';

interface GoalProgressIndicatorProps {
  goalTimeSeconds: number;
  elapsedTimeSeconds: number;
}

export default function GoalProgressIndicator(
  props: GoalProgressIndicatorProps,
) {
  const {goalTimeSeconds, elapsedTimeSeconds} = props;
  const [fill, setFill] = useState(
    (elapsedTimeSeconds / goalTimeSeconds) * 100,
  );

  //TODO: see if it can be replaced with helper
  //elapsed time minutes and hours
  const elapsedTimeMinutes = Math.floor(elapsedTimeSeconds / 60);
  const elapsedTimeHours = Math.floor(elapsedTimeMinutes / 60);
  const elapsedTimeMinutesLeft = elapsedTimeMinutes % 60;

  //goal time minutes and hours
  const goalTimeMinutes = Math.floor(goalTimeSeconds / 60);
  const goalTimeHours = Math.floor(goalTimeMinutes / 60);
  const goalTimeMinutesLeft = goalTimeMinutes % 60;

  useEffect(() => {
    setFill((elapsedTimeSeconds / goalTimeSeconds) * 100);
  }, [elapsedTimeSeconds, goalTimeSeconds]);

  return (
    <View style={goalProgressIndicatorStyles.container}>
      <AnimatedCircularProgress
        size={screenDimensions.height * 0.3}
        width={10}
        lineCap="round"
        fill={fill}
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
              {elapsedTimeHours.toString().padStart(2, '0')}:
              {elapsedTimeMinutesLeft.toString().padStart(2, '0')}
            </Text>
            <Text
              style={{
                ...globalTextStyles.bodyText,
                ...goalProgressIndicatorStyles.goalText,
              }}>
              of your
              {goalTimeHours > 0 || goalTimeMinutesLeft > 0
                ? `${goalTimeHours > 0 ? `${goalTimeHours} hour` : ''}${
                    goalTimeHours > 0 && goalTimeMinutesLeft > 0 ? ' ' : ''
                  }${
                    goalTimeMinutesLeft > 0
                      ? `${goalTimeMinutesLeft} minute`
                      : ''
                  }`
                : '0 hour 0 minute'}
              goal
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
