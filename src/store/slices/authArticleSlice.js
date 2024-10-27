import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authArticleSlice = createApi({
  reducerPath: 'authArticleApi',
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
    postAuthArticle: builder.mutation({
      query: ({ title, description, body, tagList }) => ({
        url: '/articles',
        method: 'POST',
        body: {
          article: { title, description, body, tagList },
        },
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    likeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
    }),
    dislikeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
    }),
    editArticle: builder.mutation({
      query: ({ slug, title, description, body, tagList }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: {
          article: { title, description, body, tagList },
        },
      }),
    }),
  }),
});

export const {
  usePostAuthArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useDislikeArticleMutation,
  useEditArticleMutation,
} = authArticleSlice;
