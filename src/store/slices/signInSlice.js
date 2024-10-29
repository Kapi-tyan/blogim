import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants/baseURL';

export const signInSlice = createApi({
  reducerPath: 'signInApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    postSignIn: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          user: { email, password },
        },
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('error');
  }
  const data = await response.json();
  return data;
};

export const { usePostSignInMutation } = signInSlice;
