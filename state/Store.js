//using rtk
import  { configureStore } from '@reduxjs/toolkit';
import timerStateReducer from './slices/TimerStateSlice';

export const store = configureStore({
    reducer: {
        timerState: timerStateReducer,
    }
});