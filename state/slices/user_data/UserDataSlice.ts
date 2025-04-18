import { createSlice } from "@reduxjs/toolkit"
import { setGoalFirestore } from "../../../firebase/firestore/FirestoreFunctions";
import { fetchUserData } from "./thunks/FetchUserData";

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
        reset: () => initialState,
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setGoal: (state, action) => {
            state.goal.goalSet = action.payload.goalSet;
            state.goal.currentGoal = action.payload.time_in_seconds;

            setGoalFirestore(state.userId!, action.payload.goalSet, action.payload.time_in_seconds);
        }
    },
    extraReducers(builder) {
        builder.addCase (fetchUserData.fulfilled, (state, action) => {
            state.goal.goalSet = action.payload?.goal.goal_set;
            state.goal.currentGoal = action.payload?.goal.time_in_seconds;     
                  
        })
    },
})

export const { reset, setUserId, setGoal } = userDataSlice.actions;
export default userDataSlice.reducer;