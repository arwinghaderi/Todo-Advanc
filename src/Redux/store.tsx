import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/Redux/stores/user'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
