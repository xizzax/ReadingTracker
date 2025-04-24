import {
  Text,
  View, StyleSheet,
  Pressable,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { globalStyleNumerics } from '../../constants/StyleNumerics';
import React, { useEffect, useRef, useState } from 'react';
import { globalTextStyles } from '../../styles/TextStyles';
import { useDispatch, useSelector } from 'react-redux';
import { screenDimensions } from '../../constants/ScreenDimensions';
import { useStopwatch } from 'react-timer-hook';
import { updateTodaysReadingTime } from '../../state/slices/user_data/UserDataSlice';


export default function StopwatchScreen() {
  const elapsedTime = useSelector((state: any) => 
    state.userDataState.readingHistory.length > 0 
      ? state.userDataState.readingHistory[state.userDataState.readingHistory.length - 1].readingTime 
      : 0
  );

  const dispatch = useDispatch();
  
  const stopwatchOffset = new Date(); 
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + elapsedTime);


  const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({autoStart: false, offsetTimestamp: stopwatchOffset});

  // TODO: remove this and only use redux for this -- do we even need this without redux
  const [stopwatchState, setStopwatchState] = useState<
    'running' | 'paused' | 'stopped'
  >('paused');


  const startTimer = () => {
    setStopwatchState('running');
    start();
  };
  const stopTimer = () => {
    setStopwatchState('stopped');
    dispatch(updateTodaysReadingTime(totalSeconds));
    reset();
  };
  //TODO: save timer state in redux until stopped for persistence
  const pauseTimer = () => {
    setStopwatchState('paused');
    pause();
    dispatch(updateTodaysReadingTime(totalSeconds));
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
    outputRange: [
      (screenDimensions.height * 2) / 5,
      (screenDimensions.height * 2) / 3,
    ],
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
          {/* <Stopwatch /> */}
          <Text style={{...globalTextStyles.headerText, fontSize: 40}}>
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </Text>
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
