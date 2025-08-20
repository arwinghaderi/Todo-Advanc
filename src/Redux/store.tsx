// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import userReducer from './stores/user'

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  })

export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
