import Swal from 'sweetalert2'
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

    const deleted =
      typeof window !== 'undefined'
        ? localStorage.getItem('deletedTodos')
        : null
    const deletedIds: string[] = deleted ? JSON.parse(deleted) : []

    const dummyTodos = data.todos
      .slice(0, 5)
      .filter((todo: Todo) => !deletedIds.includes(String(todo.id)))

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



export const removeTodo = createAsyncThunk<
  string,
  Todo,
  { rejectValue: ApiError }
>('todos/removeTodo', async (todo, { rejectWithValue }) => {
  const confirm = await Swal.fire({
    title: 'آیا مطمئنی؟',
    text: 'این مورد برای همیشه حذف می‌شود!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله، حذف کن!',
    cancelButtonText: 'نه، بی‌خیال!',
  })

  if (!confirm.isConfirmed) {
    return rejectWithValue({ message: 'حذف لغو شد توسط کاربر' })
  }

  try {
    if (typeof window !== 'undefined') {
      // حذف از customTodos
      const saved = localStorage.getItem('customTodos')
      const customTodos: Todo[] = saved ? JSON.parse(saved) : []
      const updated = customTodos.filter((t) => t.id !== todo.id)
      localStorage.setItem('customTodos', JSON.stringify(updated))

      // ذخیره آی‌دی حذف‌شده برای DummyJSON
      if (todo.userId !== undefined && todo.userId !== 0) {
        const deleted = localStorage.getItem('deletedTodos')
        const deletedIds: string[] = deleted ? JSON.parse(deleted) : []
        if (!deletedIds.includes(String(todo.id))) {
          deletedIds.push(String(todo.id))
          localStorage.setItem('deletedTodos', JSON.stringify(deletedIds))
        }

        await fetch(`https://dummyjson.com/todos/${todo.id}`, {
          method: 'DELETE',
        })
      }
    }

    await Swal.fire({
      title: 'حذف شد!',
      text: `تودو "${todo.todo}" با موفقیت حذف شد.`,
      icon: 'success',
    })

    return String(todo.id)
  } catch {
    await Swal.fire({
      title: 'خطا!',
      text: 'مشکلی در حذف آیتم پیش آمد.',
      icon: 'error',
    })

    return rejectWithValue({ message: 'خطا در حذف تسک' })
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
      builder.addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => String(todo.id) !== action.payload
        )
      })

  },
})

export default todoSlice.reducer
