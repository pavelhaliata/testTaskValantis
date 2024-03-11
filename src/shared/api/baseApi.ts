import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { uniqueItems, xAuthCreator } from '../helpers';
import { PAGE_SIZE } from '../constants';
import {
  ActionsRequest,
  FieldParam,
  Filter,
  Product,
  Response,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

export const baseApi = createApi({
  reducerPath: 'baseApi',
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
  refetchOnReconnect: true,
  // получение списка всех имеющиеся id
  endpoints: (builder) => ({
    getIds: builder.mutation<string[], number>({
      query: (offset) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Get_ids,
          params: {
            offset,
            limit: PAGE_SIZE + 1, //на один товар больше,
          },
        },
      }),
      transformResponse: (response: Response) =>
        Array.from(new Set(response.result)),
    }),
    // получение списка товаров
    getItems: builder.mutation<Product[], { ids: string[] }>({
      query: (params) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Get_items,
          params,
        },
      }),
      transformResponse: (response: Response<Product[]>) =>
        uniqueItems(response.result), // проверка на дубли
    }),
    // получение полей товаров
    getFields: builder.mutation<string[], { field: FieldParam }>({
      query: (params) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Get_fields,
          params,
        },
      }),
      transformResponse: (response: Response) =>
        Array.from(new Set(response.result.filter((i) => i !== null))),
    }),
    // получение списка отфильтрованных id
    filter: builder.mutation<string[], Filter>({
      query: (params) => ({
        method: 'POST',
        url: '',
        body: {
          action: ActionsRequest.Filter,
          params,
        },
      }),
      transformResponse: (response: Response) =>
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
