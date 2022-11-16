import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'modules/api-client/request';

import type { IFee, ITax, IServerFee, IServerTax } from 'modules/api-requests/taxes/types';

export const taxApi = createApi({
  reducerPath: 'taxes',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Taxes', 'Fees'],
  endpoints: builder => ({
    getTaxes: builder.query<ITax[], string>({
      providesTags: [{ type: 'Taxes', id: 'LIST' }],
      query: (courseId: string) => ({ url: `admin/courses/${courseId}/tax`, method: 'GET' }),
      transformResponse: (response: IServerTax[]) => response.map(item => ({
        ...item,
        amount: item.amount === null
          ? undefined
          : item.amount
      })),
    }),
    saveTaxes: builder.mutation<ITax[], { courseId: string, data: ITax[] }>({
      invalidatesTags: [{ type: 'Taxes', id: 'LIST' }],
      query: ({ courseId, data }) => ({ url: `admin/courses/${courseId}/tax`, method: 'POST', body: data }),
    }),
    getFees: builder.query<IFee[], string>({
      providesTags: [{ type: 'Fees', id: 'LIST' }],
      query: (courseId: string) => ({ url: `admin/courses/${courseId}/fee`, method: 'GET' }),
      transformResponse: (response: IServerFee[]) => response.map(item => ({
        ...item,
        amount: item.amount === null
          ? undefined
          : item.amount
      })),
    }),
    saveFees: builder.mutation<IFee[], { courseId: string, data: IFee[] }>({
      invalidatesTags: [{ type: 'Fees', id: 'LIST' }],
      query: ({ courseId, data }) => ({ url: `admin/courses/${courseId}/fee`, method: 'POST', body: data }),
    }),
  }),
});

export const {
  reducerPath,
  useGetFeesQuery,
  useGetTaxesQuery,
  reducer: taxReducer,
  useSaveFeesMutation,
  useSaveTaxesMutation,
  middleware: taxMiddleware,
} = taxApi;
