import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const TodoService = createApi({
  reducerPath: 'TodoService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
})
