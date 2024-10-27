import { configureStore } from '@reduxjs/toolkit';

import { articlesSlice } from './slices/articlesSlice';
import { signUpSlice } from './slices/signUpSlice';
import { signInSlice } from './slices/signInSlice';
import { editProfileSlice } from './slices/editProfileSlice';
import { authArticleSlice } from './slices/authArticleSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [articlesSlice.reducerPath]: articlesSlice.reducer,
    [signInSlice.reducerPath]: signInSlice.reducer,
    [signUpSlice.reducerPath]: signUpSlice.reducer,
    [editProfileSlice.reducerPath]: signUpSlice.reducer,
    [authArticleSlice.reducerPath]: signUpSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articlesSlice.middleware)
      .concat(signInSlice.middleware)
      .concat(editProfileSlice.middleware)
      .concat(signUpSlice.middleware)
      .concat(authArticleSlice.middleware),
});

export default store;
