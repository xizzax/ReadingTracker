import {createSlice} from '@reduxjs/toolkit';

type currentlyReadingBook = {
    key: string, 
    title: string,
    author: string,
    coverUrl: string, //TODO: add action to get cover of book in apislice
    //TODO: option to upload your own image (i dont know google probably has it)
    description: string,
    isbn: string,
    pageCount: number,
    format: 'digital' | 'audiobook' | 'paperback' | 'hardback',
    genre: string,
}

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