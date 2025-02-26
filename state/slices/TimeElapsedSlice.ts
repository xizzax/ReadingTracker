import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  elapsedTime: 0,
};

export const elapsedTimeSlice = createSlice({
  name: 'elapsed_time',
  initialState,
  reducers: {
    incrementElapsedTime: state => {
      state.elapsedTime += 1;
    },

    setElapsedTime: (state, action) => {
      state.elapsedTime = action.payload;
    },
  },
});

export const {setElapsedTime, incrementElapsedTime} = elapsedTimeSlice.actions;
export default elapsedTimeSlice.reducer;
