// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import userReducer from './stores/user'
import todReducer from './stores/todo'

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      todos: todReducer,
    },
  })

export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
