import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants/baseURL';

export const articlesSlice = createApi({
  reducerPath: 'articleApi',
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
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit = 5, offset = 0 }) => `articles?limit=${limit}&offset=${offset}`,
      providesTags: ['Articles'],
    }),
    getArticleBySlug: builder.query({
      query: (slug) => `articles/${slug}`,
      invalidatesTags: ['Articles'],
    }),
    postAuthArticle: builder.mutation({
      query: ({ title, description, body, tagList }) => ({
        url: '/articles',
        method: 'POST',
        body: {
          article: { title, description, body, tagList },
        },
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
    likeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Articles'],
    }),
    dislikeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
    editArticle: builder.mutation({
      query: ({ slug, title, description, body, tagList }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: {
          article: { title, description, body, tagList },
        },
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  usePostAuthArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useDislikeArticleMutation,
  useEditArticleMutation,
} = articlesSlice;
