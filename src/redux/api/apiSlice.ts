import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-server-gilt.vercel.app',
  }),
  tagTypes: ['comments', 'books'],
  endpoints: () => ({}),
});
