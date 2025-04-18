import { getFirestore } from "@react-native-firebase/firestore";
import firestore from '@react-native-firebase/firestore';

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk( //TODO: move to FirestoreFunctions
    'user_data/fetchUserData',
    async (userId: string, thunkAPI) => {
        try { 
            const userData = await firestore().collection('user_data').doc(userId).get();
            return userData.data();
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);