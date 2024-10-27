import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesSlice = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit = 5, offset = 0 }) => `articles?limit=${limit}&offset=${offset}`,
    }),
    getArticleBySlug: builder.query({
      query: (slug) => `articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleBySlugQuery } = articlesSlice;
