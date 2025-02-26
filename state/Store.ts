//using rtk
import  { configureStore } from '@reduxjs/toolkit';
import timerStateReducer from './slices/TimerStateSlice';
import elapsedTimeReducer from './slices/TimeElapsedSlice';

export const store = configureStore({
    reducer: {
        timerState: timerStateReducer,
        elapsedTimeState: elapsedTimeReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;