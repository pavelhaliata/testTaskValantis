import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { uniqueItems, xAuthCreator } from '../helpers';
import { ActionsRequest, Item, Response } from './types.ts';
import { PAGE_SIZE } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Items'],
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: API_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('X-Auth', xAuthCreator(API_PASSWORD));
        return headers;
      },
    }),
    { maxRetries: 3 },
  ),
  endpoints: (builder) => ({
    getIds: builder.mutation<string[], Partial<number>>({
      query: (offset = 1) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Get_ids,
          params: {
            offset,
            limit: PAGE_SIZE,
          },
        },
      }),
      transformResponse: (response: Response<string[]>) =>
        Array.from(new Set(response.result)),
    }),
    getItems: builder.mutation<Item[], { ids: string[] }>({
      query: (params) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Get_items,
          params,
        },
      }),
      transformResponse: (response: Response<Item[]>) =>
        uniqueItems(response.result),
    }),
    getFields: builder.mutation<
      Response<string | null[]>,
      { field: string; offset: 3; limit: 5 }
    >({
      query: (params) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Get_fields,
          params,
        },
      }),
    }),
    filter: builder.mutation<string[], { price: number }>({
      query: (params) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Filter,
          params,
        },
      }),
      transformResponse: (response: Response<string[]>) =>
        Array.from(new Set(response.result)),
    }),
  }),
});

export const {
  useGetIdsMutation,
  useGetItemsMutation,
  useGetFieldsMutation,
  useFilterMutation,
} = baseApi;
