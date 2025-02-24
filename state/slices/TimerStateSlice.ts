import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  timerState: 'stopped', // this is going to be the state when app starts
  //TODO: figure out a way to store this locally or on firebase
};

export const timerStateSlice = createSlice({
  name: 'timer_state', // this name is used as the key in the store
  initialState,
  reducers: {
    setRunning: state => {
      state.timerState = 'running';
    },
    setPaused: state => {
      state.timerState = 'paused';
    },
    setStopped: state => {
      state.timerState = 'stopped';
    },
  },
});

// exporting actions
export const { setRunning, setPaused, setStopped } = timerStateSlice.actions;

export default timerStateSlice.reducer; // used in store