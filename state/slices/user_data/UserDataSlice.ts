import { createSlice } from "@reduxjs/toolkit"
import { addTodaytoReadingHistoryFirestore, setGoalFirestore, updateTodaysReadingTimeFirestore } from "../../../firebase/firestore/FirestoreFunctions";
import { compatibilityFlags } from "react-native-screens";
import { booksSlice } from "../BooksSlice";

type readingHistory = {
    date: string,
    goalTime: number,
    readingTime: number,
    breakdown: [] //TODO: add breakdown type (books etc)
}

type currentlyReadingBook = {
    isbn: string,
    startDate: string, 
    totalPages: number,
    timeRead: number,
    readPages: number,
    progress: number, // not in firebase

}

const initialState = {
    userId: null,
    readingHistory: [] as readingHistory[],
    currentlyReading: [] as currentlyReadingBook[],
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
            //goal
            state.goal.goalSet = action.payload.goal.goal_set;
            state.goal.currentGoal = action.payload.goal.time_in_seconds;

            //reading history
            const reading_history = action.payload.reading_history;
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

            //currently reading
            const currently_reading = action.payload.currently_reading;
            currently_reading.forEach(currentBook => {
                state.currentlyReading.push(
                    {
                        isbn: currentBook.isbn,
                        startDate: currentBook.start_date,
                        totalPages: currentBook.total_pages,
                        timeRead: currentBook.time_read,
                        readPages: currentBook.read_pages,
                        progress: (currentBook.read_pages / currentBook.total_pages) * 100,
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