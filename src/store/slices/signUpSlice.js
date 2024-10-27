import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signUpSlice = createApi({
  reducerPath: 'signUpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api',
  }),
  endpoints: (builder) => ({
    postSignUp: builder.mutation({
      query: ({ username, email, password }) => ({
        url: '/users',
        method: 'POST',
        body: {
          user: { username, email, password },
        },
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { usePostSignUpMutation } = signUpSlice;
