import {createSlice} from '@reduxjs/toolkit';



const initialState = {
  books: [], // TODO: update from firebase when the app is loaded
};

export const booksSlice = createSlice({
  name: 'currently_reading_books',
  initialState,
  reducers: {
    addBook: (state, payload) => {},
    deleteBook: (state, payload) => {},
  },
});