import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import {Colors} from '../constants/Colors';

export default function GoalProgressIndicator() {
  return (
    <View style={goalProgressIndicatorStyles.container}>
      <AnimatedCircularProgress
        size={200}
        width={5}
        fill={70}
        tintColor={Colors.primary}
        arcSweepAngle={180}
        rotation={270}
        backgroundColor={Colors.lightGray}>
        {fill => (
          <View>
            <Text>{'3 out 30 min goals'}</Text>
            <Text>{'70%'}</Text>
            <Text>{'3 out 30 min goals'}</Text>
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
});
