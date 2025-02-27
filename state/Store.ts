//using rtk
import  { configureStore } from '@reduxjs/toolkit';
import timerStateReducer from './slices/TimerStateSlice';
import elapsedTimeReducer from './slices/TimeElapsedSlice';
import { apiSlice } from './slices/ApiSlice';

export const store = configureStore({
    reducer: {
        timerState: timerStateReducer,
        elapsedTimeState: elapsedTimeReducer,

        //for api
        [apiSlice.reducerPath]: apiSlice.reducer, // attach RTK Query's reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // a
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;