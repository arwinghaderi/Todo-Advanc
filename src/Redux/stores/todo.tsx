import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiError, Todo } from '../../types/todo'
import { v4 as uuidv4 } from 'uuid'

export const getTodos = createAsyncThunk<
  { todos: Todo[] },
  void,
  { rejectValue: ApiError }
>('todos/getTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://dummyjson.com/todos')
    const data = await response.json()
    if (!response.ok) return rejectWithValue(data)

    const dummyTodos = data.todos.slice(0, 5)

    const saved =
      typeof window !== 'undefined' ? localStorage.getItem('customTodos') : null

    const customTodos: Todo[] = saved ? JSON.parse(saved) : []

    return {
      todos: [...customTodos, ...dummyTodos],
    }
  } catch {
    return rejectWithValue({ message: 'خطای ناشناخته' })
  }
})

export const addTodo = createAsyncThunk<
  Todo,
  { todo: string; completed?: boolean; userId?: number },
  { rejectValue: ApiError }
>('todos/addTodo', async (payload, { rejectWithValue }) => {
  try {
    const generatedId = uuidv4()

    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: generatedId,
        todo: payload.todo,
        completed: payload.completed ?? false,
        userId: payload.userId ?? 1,
      }),
    })

    const data = await response.json()

    if (!response.ok) return rejectWithValue(data)

    return {
      ...data,
      id: generatedId,
    }
  } catch {
    return rejectWithValue({ message: 'خطای ناشناخته در افزودن تسک' })
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
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.unshift(action.payload)

      const saved = localStorage.getItem('customTodos')
      const customTodos: Todo[] = saved ? JSON.parse(saved) : []
      customTodos.unshift(action.payload)
      localStorage.setItem('customTodos', JSON.stringify(customTodos))
    })
  },
})

export default todoSlice.reducer
