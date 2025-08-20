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
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      return rejectWithValue(data)
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      document.cookie = `accessToken=${data.token}; path=/; max-age=3600`
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

export const userLogout = createAsyncThunk<
  void,
  void,
  { rejectValue: DummyErrorResponse }
>('user/userLogout', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    if (!res.ok) {
      const data = await res.json()
      return rejectWithValue(data)
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      document.cookie =
        'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }

    return
  } catch {
    return rejectWithValue({ message: 'خطا در خروج از حساب', status: 500 })
  }
})

interface AuthState {
  user: User | null
  isUserLoaded: boolean
}

const initialState: AuthState = {
  user: null,
  isUserLoaded: false,
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isUserLoaded = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload
      state.isUserLoaded = true
    })
    builder.addCase(fetchUserWithToken.fulfilled, (state, action) => {
      state.user = action.payload
      state.isUserLoaded = true
    })
    builder.addCase(fetchUserWithToken.rejected, (state) => {
      state.user = null
      state.isUserLoaded = true
    })
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = null
      state.isUserLoaded = true
    })
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
