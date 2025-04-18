import {StyleSheet, Text, View} from 'react-native';
import Button from '../../components/buttons/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../constants/Colors';
import {globalTextStyles} from '../../styles/TextStyles';
import LinearGradient from 'react-native-linear-gradient';
import {TimerPicker, TimerPickerRef} from 'react-native-timer-picker';
import MaskedView from '@react-native-masked-view/masked-view';
import {useRef} from 'react';
import {signout} from '../../firebase/auth/SignOut';
import { useDispatch } from 'react-redux';
import { setGoal} from '../../state/slices/user_data/UserDataSlice';
import { HHMMSSToTotalSeconds } from '../../helper/HHMMSSToTotalSeconds';

export default function SetGoalScreen({navigation}:any) {
  const timerPickerRef = useRef<TimerPickerRef>(null);

  const dispatch = useDispatch();

  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.lightGray]}
      style={setGoalScreenStyles.screen}>
      <View>
        <Text
          style={{
            ...globalTextStyles.headerText,
            ...setGoalScreenStyles.header,
          }}>
          Set your daily reading goal!
        </Text>
      </View>
      <View>
        <TimerPicker
          aggressivelyGetLatestDuration={true}
          ref={timerPickerRef}
          padWithNItems={3}
          hourLabel={'h'}
          minuteLabel="m"
          secondLabel="s"
          MaskedView={MaskedView}
          styles={{
            theme: 'light',
            backgroundColor: 'transparent',
            pickerItem: {
              fontSize: 34,
            },
            pickerLabel: {
              fontSize: 25,
              // marginTop: 0,
            },
            pickerContainer: {
              marginRight: 6,
            },
            pickerItemContainer: {
              width: 100,
            },
            pickerLabelContainer: {
              bottom: 6,
            },
          }}
        />
      </View>
      <View>
        <Button
          title="Set Goal"
          onPressFtn={() => {
            const latestDuration = timerPickerRef.current?.latestDuration;
            const goalTime = HHMMSSToTotalSeconds(
              latestDuration?.hours?.current!,
              latestDuration?.minutes?.current!,
              latestDuration?.seconds?.current!,
            );

            console.log('Goal time: ', goalTime);
            
            dispatch(setGoal(
              {
                goalSet: true,
                time_in_seconds: goalTime
              }
            ));

            navigation.replace("HomeStackBottomTabNavigator");
          }}
        />
      </View>
    </LinearGradient>
  );
}

const setGoalScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  header: {
    textAlign: 'center',
    // color: Colors.white,
  },
});
