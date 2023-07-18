import { api } from '@/redux/api/apiSlice';
import { IBook } from '@/types/globalTypes';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postBook: builder.mutation<IBook, Partial<IBook>>({
      query: (data) => ({
        url: '/addBook',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  usePostBookMutation,
  usePostCommentMutation,
  useSingleBookQuery,
} = bookApi;
