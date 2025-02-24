import {Text, View, SafeAreaView, StyleSheet, Pressable, Animated} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/Colors';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import CircularTimer from 'react-native-circular-timer';
import React, {useEffect, useRef, useState} from 'react';
import {globalTextStyles} from '../../styles/TextStyles';

interface StopwatchScreenProps {
  //TODO: props
}

export default function StopwatchScreen(props: StopwatchScreenProps) {
  //--------------------------------------------
  //hour minute calculations and state
  //--------------------------------------------
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [minutesElapsed, setMinutesElapsed] = useState(0);
  const [hoursElapsed, setHoursElapsed] = useState(0);

  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);

  const [stopwatchState, setStopwatchState] = useState<
    'running' | 'paused' | 'stopped'
  >('paused');

  useEffect(() => {
    hourMinuteSecondCalculation(totalSecondsElapsed);
  }, [totalSecondsElapsed]);

  const timeRef = useRef<ReturnType<typeof setInterval> | null>(null); //used to store interval

  const startTimer = () => {
    if (stopwatchState != 'running') {
      setStopwatchState('running');
      console.log(stopwatchState);

      timeRef.current = setInterval(() => {
        setTotalSecondsElapsed(prevTime => prevTime + 1);
        console.log(totalSecondsElapsed);
      }, 1000);
      hourMinuteSecondCalculation(totalSecondsElapsed);
    }
  };
  const stopTimer = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
      setStopwatchState('stopped');
      setTotalSecondsElapsed(0);
      hourMinuteSecondCalculation(totalSecondsElapsed);
      console.log(stopwatchState);
    } else {
      timeRef.current = setInterval(() => {
        setTotalSecondsElapsed(prevTime => prevTime);
      }, 1000);
      clearInterval(timeRef.current);
      timeRef.current = null;
      setStopwatchState('stopped');
      setTotalSecondsElapsed(0);
      hourMinuteSecondCalculation(totalSecondsElapsed);
      console.log(stopwatchState);
    }
  };
  //TODO: save timer state in redux until stopped
  const pauseTimer = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
      setStopwatchState('paused');
    }
  };

  const hourMinuteSecondCalculation = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    setHoursElapsed(Math.floor(minutes / 60));
    setMinutesElapsed(minutes % 60);
    setSecondsElapsed(totalSeconds % 60);
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

  const backgroundInterpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.secondary, Colors.primary],
  });

  return (
    //TODO: auto imply leading
    <View style={stopwatchScreenStyles.screen}>
      <Animated.View
        style={[
          stopwatchScreenStyles.timerContainer,
          {
            backgroundColor: backgroundInterpolatedColor,
          },
        ]}>
        {/* TODO: get rid<Text
          style={{
            ...globalTextStyles.subheaderText,
            ...stopwatchScreenStyles.titleText,
          }}>
          Track Your Reading Progress
        </Text> */}
        <Text
          style={{
            ...globalTextStyles.headerText,
            ...stopwatchScreenStyles.timeText, 
          }}>
          {hoursElapsed.toString().padStart(2, '0')}:
          {minutesElapsed.toString().padStart(2, '0')}:
          {secondsElapsed.toString().padStart(2, '0')}
        </Text>
      </Animated.View>

      <View style={stopwatchScreenStyles.buttonsContainer}>
        {stopwatchState !== 'running' && (
          <>
            <Animated.View
              style={[
                stopwatchScreenStyles.mainButtonContainer,
                {
                  backgroundColor: interpolatedColor,
                },
              ]}>
              <Pressable onPress={startTimer}>
                <Icon
                  name="play-outline"
                  size={globalStyleNumerics.iconSize + 10}
                  color={Colors.white}
                />
              </Pressable>
            </Animated.View>
          </>
        )}
        {stopwatchState === 'running' && (
          <>
            <Animated.View
              style={[
                stopwatchScreenStyles.mainButtonContainer,
                {
                  backgroundColor: interpolatedColor,
                },
              ]}>
              <Pressable onPress={pauseTimer}>
                <Icon
                  name="pause-outline"
                  size={globalStyleNumerics.iconSize + 10}
                  color={Colors.white}
                />
              </Pressable>
            </Animated.View>
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
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  bottomContainer: {
    flex: 3,
    padding: 20,
  },
  timeText: {
    fontSize: 40,
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
