import {Text, View, SafeAreaView, StyleSheet, Pressable} from 'react-native';
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
  //hour minute calculations and state
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

  return (
    //TODO: auto imply leading
    <View style={stopwatchScreenStyles.screen}>
      <View
        style={[
          stopwatchScreenStyles.timerContainer,
          {
            backgroundColor:
              stopwatchState === 'running' ? Colors.primary : Colors.secondary,
          },
        ]}>
        <Text
          style={{
            ...globalTextStyles.subheaderText,
            ...stopwatchScreenStyles.titleText,
          }}>
          Track Your Reading Progress
        </Text>
        <Text
          style={{
            ...globalTextStyles.headerText,
            ...stopwatchScreenStyles.timeText,
          }}>
          {hoursElapsed.toString().padStart(2, '0')}:
          {minutesElapsed.toString().padStart(2, '0')}:
          {secondsElapsed.toString().padStart(2, '0')}
        </Text>
      </View>

      <View style={stopwatchScreenStyles.buttonsContainer}>
        {stopwatchState !== 'running' && (
          <>
            <View
              style={[
                stopwatchScreenStyles.mainButtonContainer,
                {
                  backgroundColor: Colors.primary,
                },
              ]}>
              <Pressable onPress={startTimer}>
                <Icon
                  name="play-outline"
                  size={globalStyleNumerics.iconSize + 10}
                  color={Colors.white}
                />
              </Pressable>
            </View>
          </>
        )}
        {stopwatchState === 'running' && (
          <>
            <View
              style={[
                stopwatchScreenStyles.mainButtonContainer,
                {
                  backgroundColor: Colors.secondary,
                },
              ]}>
              <Pressable onPress={pauseTimer}>
                <Icon
                  name="pause-outline"
                  size={globalStyleNumerics.iconSize + 10}
                  color={Colors.white}
                />
              </Pressable>
            </View>
          </>
        )}

        <Pressable onPress={stopTimer}>
          <Icon
            name="stop-outline"
            size={globalStyleNumerics.iconSize}
            color={Colors.primary}
          />
        </Pressable>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15,
    width: '75%',
  },
});
