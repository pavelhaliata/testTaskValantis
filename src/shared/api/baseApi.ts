import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import md5 from 'md5';

const VITE_API_BASE_URL = import.meta.env.VITE_API_URL
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD

const password = 'Valantis';
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const xAuth = md5(password + '_' + timestamp);

export const baseApi = createApi({
    reducerPath: 'goodsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.valantis.store:41000/',
        prepareHeaders: (headers) => {

            headers.set('X-Auth', xAuth);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getGoodsApi: builder.mutation<any, RequestParamType>({
            query: (body: any) => ({
                method: 'POST',
                url: '',
                body,
            }),
        }),
    }),
});

export const {useGetGoodsApiMutation} = baseApi;

// types
type ActionType = "filter" | "get_ids" | "get_items" | "get_fields"

type RequestParamType<T = {}> = {
    "action": ActionType,
    "params": T
}

