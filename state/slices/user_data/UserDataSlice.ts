import { createSlice } from "@reduxjs/toolkit"
import { addTodaytoReadingHistoryFirestore, setGoalFirestore, updateTodaysReadingTimeFirestore } from "../../../firebase/firestore/FirestoreFunctions";
import { compatibilityFlags } from "react-native-screens";

type readingHistory = {
    date: string,
    goalTime: number,
    readingTime: number,
    breakdown: [] //TODO: add breakdown type (books etc)
}

const initialState = {
    userId: null,
    readingHistory: [] as readingHistory[],
    goal: {
        goalSet: false,
        currentGoal: 0,
    }
}

export const userDataSlice = createSlice({
    name: 'user_data',
    initialState,
    reducers: {
        reset: () => initialState, //reset all data
        setUserData: (state, action) =>{
            ////for setting data gotten from firebase////
            state.goal.goalSet = action.payload.goal.goal_set;
            state.goal.currentGoal = action.payload.goal.time_in_seconds;

            const reading_history = action.payload.reading_history;
            // console.log("reading history: ", reading_history);

            reading_history.forEach(item => {
                state.readingHistory.push(
                    {
                        date: item.date,
                        goalTime: item.goal_time,
                        readingTime: item.reading_time,
                        breakdown: item.breakdown, //TODO: add breakdown when it comes to book history
                    }
                );
                
            });

        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setGoal: (state, action) => {
            state.goal.goalSet = action.payload.goalSet;
            state.goal.currentGoal = action.payload.time_in_seconds;
            setGoalFirestore(state.userId!, action.payload.goalSet, action.payload.time_in_seconds);
        },
        addTodayToReadingHistory: (state)=>{
            const date = new Date();
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
              date.getMonth() + 1,
            ).padStart(2, '0')}-${date.getFullYear()}`;

            state.readingHistory.push(
                {
                    date: formattedDate,
                    goalTime: state.goal.currentGoal,
                    readingTime: 0,
                    breakdown: []
                }
            );
            addTodaytoReadingHistoryFirestore(
                state.userId!,
                formattedDate,
                state.goal.currentGoal,
                0,
            );
        },
        updateTodaysReadingTime: (state, action)=>{
            state.readingHistory[state.readingHistory.length - 1].readingTime = action.payload;
            updateTodaysReadingTimeFirestore(state.userId!, action.payload);
        },
    },
})

export const { reset, setUserId, setGoal, setUserData, addTodayToReadingHistory, updateTodaysReadingTime } = userDataSlice.actions;
export default userDataSlice.reducer;