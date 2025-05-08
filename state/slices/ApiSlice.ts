import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://www.googleapis.com/books/v1/volumes'}),
  endpoints: builder => ({
    search: builder.query({
      query: term => `?q=${term}&maxResults=20`,
      transformResponse: response => {
        let books: any[] | Promise<any[]> = [];
        response.items.forEach((book: { volumeInfo: { title: any; subtitle: any; description: any; authors: any; categories: any; imageLinks: { thumbnail: string; }; industryIdentifiers: { identifier: any; }[]; }; }) => {
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
        return books;
      },
    }),
  }),
});

export const {useLazySearchQuery: useSearchBooksQuery} = apiSlice;
