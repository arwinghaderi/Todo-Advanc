import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TodosResponse, ApiError, Todo } from '../../types/todo'

export const getTodos = createAsyncThunk<
  TodosResponse,
  void,
  { rejectValue: ApiError }
>('todos/getTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://dummyjson.com/todos')

    const data = await response.json()

    if (!response.ok) {
      return rejectWithValue(data)
    }

    return data
  } catch {
    return rejectWithValue({ message: 'خطای ناشناخته' })
  }
})

interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: [],
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload.todos
    })
  },
})

export default todoSlice.reducer
