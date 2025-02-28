import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://www.googleapis.com/books/v1/volumes'}),
  endpoints: builder => ({
    search: builder.query({
      query: term => `?q=${term}&maxResults=20`,
      transformResponse: response => {
        console.log('API response:', response);
        let books = [];
        response.items.forEach(book => {
            const tempObj = {
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            desc: book.volumeInfo.description,
            authors: book.volumeInfo.authors,
            genres: book.volumeInfo.categories,
            coverUrl: book.volumeInfo.imageLinks?.thumbnail 
                  ? book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://') 
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbXCpiYKfm11YUjU715AE4xto0XO6fzBiL8Q&s',
            isbn: book.volumeInfo.industryIdentifiers[0].identifier, 
            };
          books.push(tempObj);
        });
        console.log("formatted response: "+books);
        
        return books;
      },
    }),
  }),
});

export const {useLazySearchQuery} = apiSlice;
