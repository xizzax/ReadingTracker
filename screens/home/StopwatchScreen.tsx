import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/Colors';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import CircularTimer from 'react-native-circular-timer';
import React, {useEffect, useRef, useState} from 'react';
import {globalTextStyles} from '../../styles/TextStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  setPaused,
  setRunning,
  setStopped,
} from '../../state/slices/TimerStateSlice';
import {
  setElapsedTime,
  incrementElapsedTime,
} from '../../state/slices/TimeElapsedSlice';
import Stopwatch from '../../components/Stopwatch';
import { screenDimensions } from '../../constants/ScreenDimensions';

interface StopwatchScreenProps {
  //TODO: props
}

export default function StopwatchScreen(props: StopwatchScreenProps) {
  //--------------------------------------------
  //redux setup
  //--------------------------------------------
  const stopwatchStateFromStore = useSelector(
    state => state.timerState.timerState,
  );
  const dispatch = useDispatch();

  //--------------------------------------------
  //hour minute calculations and state
  //--------------------------------------------
  // const [secondsElapsed, setSecondsElapsed] = useState(0);
  // const [minutesElapsed, setMinutesElapsed] = useState(0);
  // const [hoursElapsed, setHoursElapsed] = useState(0);

  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);

  // TODO: remove this and only use redux for this -- do we even need this without redux
  const [stopwatchState, setStopwatchState] = useState<
    'running' | 'paused' | 'stopped'
  >('paused');


  const timeRef = useRef<ReturnType<typeof setInterval> | null>(null); //used to store interval

  const startTimer = () => {
    if (stopwatchState != 'running') {
      setStopwatchState('running');
      dispatch(setRunning());

      timeRef.current = setInterval(() => {
        // const time = useSelector(state =>state.elapsedTimeState.elapsedTime);
        dispatch(incrementElapsedTime());
      }, 1000);
    }
  };
  const stopTimer = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
      setStopwatchState('stopped');
      dispatch(setStopped());
      dispatch(setElapsedTime(0));
    } else {
      timeRef.current = setInterval(() => {
        setTotalSecondsElapsed(prevTime => prevTime);
      }, 1000);
      clearInterval(timeRef.current);
      timeRef.current = null;
      setStopwatchState('stopped');
      dispatch(setStopped());
      dispatch(setElapsedTime(0));
    }
  };
  //TODO: save timer state in redux until stopped for persistence
  const pauseTimer = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
      setStopwatchState('paused');
      dispatch(setPaused());
    }
  };

  //--------------------------------------------
  // color animations
  //--------------------------------------------
  const colorAnim = useState(new Animated.Value(0))[0]; // 0 = paused/stopped (inactive), 1 = running
  

  useEffect(() => {
    // When the stopwatchState changes, animate to the correct value.
    Animated.timing(colorAnim, {
      toValue: stopwatchState === 'running' ? 1 : 0,
      duration: 750, // duration of the transition (1 second)
      useNativeDriver: false, // useNativeDriver doesn't support color animations
    }).start();
  }, [stopwatchState, colorAnim]);

  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.primary, Colors.secondary],
  });
  const containerHeightAnim = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenDimensions.height * 2/5,screenDimensions.height * 4/5]
  });

  const backgroundInterpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.secondary, Colors.primary],
  });

  return (
    <View style={stopwatchScreenStyles.screen}>
      <Animated.View
        style={[
          stopwatchScreenStyles.timerContainer,
          {
            backgroundColor: backgroundInterpolatedColor,
            height: containerHeightAnim,
          },
        ]}>
        <Text
          style={{
            ...globalTextStyles.subheaderText,
            ...stopwatchScreenStyles.titleText,
          }}>
          Track Your Reading Progress
        </Text>

        <View>
          <Stopwatch />
        </View>
      </Animated.View>

      <View style={stopwatchScreenStyles.buttonsContainer}>
        {stopwatchState !== 'running' && (
          <>
            <Pressable onPress={startTimer}>
              <Animated.View
                style={[
                  stopwatchScreenStyles.mainButtonContainer,
                  {
                    backgroundColor: interpolatedColor,
                 
                  },
                ]}>
                <Icon
                  name="play-outline"
                  size={globalStyleNumerics.iconSize + 10}
                  color={Colors.white}
                />
              </Animated.View>
            </Pressable>
          </>
        )}
        {stopwatchState === 'running' && (
          <>
            <Pressable onPress={pauseTimer}>
              <Animated.View
                style={[
                  stopwatchScreenStyles.mainButtonContainer,
                  {
                    backgroundColor: interpolatedColor,
                  },
                ]}>
                <Icon
                  name="pause-outline"
                  size={globalStyleNumerics.iconSize + 10}
                  color={Colors.white}
                />
              </Animated.View>
            </Pressable>
          </>
        )}
        <View style={stopwatchScreenStyles.stopButton}>
          <Pressable onPress={stopTimer}>
            <Icon
              name="stop-outline"
              size={globalStyleNumerics.iconSize}
              color={Colors.primary}
            />
          </Pressable>
        </View>
      </View>

      <View style={stopwatchScreenStyles.bottomContainer}></View>
    </View>
  );
}

const stopwatchScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    // flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  bottomContainer: {
    flex: 3,
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    color: Colors.black,
  },
  mainButtonContainer: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderColor: Colors.white,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.gray,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonsContainer: {
    zIndex: 1,
    marginTop: -50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    width: '100%',
  },
  stopButton: {
    position: 'absolute',
    right: 0,
    marginRight: 5,
  },
});
