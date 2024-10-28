import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TodoService } from '../services/TodoService'

const rootReducer = combineReducers({
  [TodoService.reducerPath]: TodoService.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(TodoService.middleware),
})
