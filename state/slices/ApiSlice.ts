import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://www.googleapis.com/books/v1/volumes'}),
  endpoints: builder => ({
    search: builder.query({
      query: term => `?q=${term}`,
      transformResponse: response => {
        console.log('API response:', response);
        return response.docs;
      },
    }),
  }),
});

export const {useSearchQuery} = apiSlice;
