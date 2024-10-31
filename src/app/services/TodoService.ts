import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
console.log('API URL:', import.meta.env.VITE_API_URL)
export const TodoService = createApi({
  reducerPath: 'TodoService',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
})
