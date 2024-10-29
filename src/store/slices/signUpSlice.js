import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants/baseURL';

export const signUpSlice = createApi({
  reducerPath: 'signUpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
