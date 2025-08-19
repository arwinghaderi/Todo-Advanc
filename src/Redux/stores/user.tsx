import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  DummyLoginResponse,
  LoginPayload,
  DummyErrorResponse,
  RegisterPayload,
} from '@/types/auth'
import { User } from '@/types/module'

export const userLogin = createAsyncThunk<
  DummyLoginResponse,
  LoginPayload,
  { rejectValue: DummyErrorResponse }
>('user/userLogin', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData: DummyErrorResponse = await response.json()
      return rejectWithValue(errorData)
    }

    const data: DummyLoginResponse = await response.json()
    return data
  } catch {
    return rejectWithValue({ message: 'خطای ناشناخته', status: 500 })
  }
})

export const userRegister = createAsyncThunk<
  DummyLoginResponse,
  RegisterPayload,
  { rejectValue: DummyErrorResponse }
>('user/userRegister', async (payload, { rejectWithValue }) => {
  try {
    const registerRes = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!registerRes.ok) {
      const errorData: DummyErrorResponse = await registerRes.json()
      return rejectWithValue(errorData)
    }

    const loginRes = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    })

    if (!loginRes.ok) {
      const errorData: DummyErrorResponse = await loginRes.json()
      return rejectWithValue(errorData)
    }

    const loginData: DummyLoginResponse = await loginRes.json()
    return loginData
  } catch {
    return rejectWithValue({ message: 'خطای ناشناخته', status: 500 })
  }
})

interface AuthState {
  user: User | null
}

const savedUser = localStorage.getItem('user')

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    })

    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    })
  },
})

export default authSlice.reducer
