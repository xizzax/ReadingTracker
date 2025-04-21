import { createSlice } from "@reduxjs/toolkit"
import { setGoalFirestore } from "../../../firebase/firestore/FirestoreFunctions";

const initialState = {
    userId: null,
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
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setGoal: (state, action) => {
            state.goal.goalSet = action.payload.goalSet;
            state.goal.currentGoal = action.payload.time_in_seconds;
            setGoalFirestore(state.userId!, action.payload.goalSet, action.payload.time_in_seconds);
        }
    },
})

export const { reset, setUserId, setGoal, setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;