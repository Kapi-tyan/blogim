import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../constants/baseURL';

import { fetchProtectedData } from './signInSlice';
import { signIn } from './authSlice';

export const editProfileSlice = createApi({
  reducerPath: 'editProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postEditProfile: builder.mutation({
      query: ({ username, email, password, image }) => ({
        url: '/user',
        method: 'PUT',
        body: {
          user: { username, email, password, image },
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});
export const fetchUserOnLoad = createAsyncThunk('auth/fetchUserOnLoad', async (_, { getState, dispatch }) => {
  const { token } = getState().auth;
  if (token) {
    const response = await fetchProtectedData(token);
    dispatch(
      signIn({
        username: response.user.username,
        token,
        image: response.user.image,
        email: response.user.email,
      })
    );
  }
});

export const { usePostEditProfileMutation } = editProfileSlice;
