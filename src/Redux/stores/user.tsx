import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  DummyLoginResponse,
  LoginPayload,
  DummyErrorResponse,
} from '@/types/auth'
import { User } from '@/types/module'

export const userLogin = createAsyncThunk<
  DummyLoginResponse,
  LoginPayload,
  { rejectValue: DummyErrorResponse }
>('user/userLogin', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return rejectWithValue(data)
    }

    return data
  } catch {
    return rejectWithValue({ message: 'خطای ناشناخته', status: 500 })
  }
})

export const fetchUserWithToken = createAsyncThunk<
  User,
  string,
  { rejectValue: DummyErrorResponse }
>('user/fetchUserWithToken', async (token, { rejectWithValue }) => {
  try {
    const res = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      cache: 'no-store',
    })

    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch {
    return rejectWithValue({ message: 'خطای ناشناخته', status: 500 })
  }
})

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload))
      }
    })
    builder.addCase(fetchUserWithToken.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
