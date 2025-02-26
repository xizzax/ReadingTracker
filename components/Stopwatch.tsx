import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {globalTextStyles} from '../styles/TextStyles';

//separating this component from the rest of the screen
//so it is the only one re-rendered
//instead of the whole screen everytime
export default function Stopwatch() {
  const elapsedTime = useSelector(state => state.elapsedTimeState.elapsedTime); //total seconds
  let minutesElapsed = Math.floor(elapsedTime / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  minutesElapsed = Math.floor(minutesElapsed % 60);
  const secondsElapsed = Math.floor(elapsedTime % 60);

  return (
    <View>
      <Text
        style={{
          ...globalTextStyles.headerText,
          ...stopwatchStyles.timeText,
        }}>
        {' '}
        {hoursElapsed.toString().padStart(2, '0')}:
        {minutesElapsed.toString().padStart(2, '0')}:
        {secondsElapsed.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}

const stopwatchStyles = StyleSheet.create({
  timeText: {
    fontSize: 40,
  },
});
