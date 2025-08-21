'use client'

import { FaPlusCircle } from 'react-icons/fa'
import Input from '../../module/Input'
import CustomSelect from './CustomSelect'
import Button from '../../module/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TodoPayload } from '../../../lib/Zod/types'
import { todoSchema } from '../../../lib/Zod/schemas/todo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/Redux/store'
import { addTodo } from '@/Redux/stores/todo'

export default function Form() {
  const dispatch = useDispatch<AppDispatch>()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoPayload>({
    resolver: zodResolver(todoSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: TodoPayload) => {
      const result = await dispatch(addTodo({ todo: data.todo }))
      if (addTodo.fulfilled.match(result)) return result.payload
      throw new Error(
        typeof result.payload === 'object' &&
        result.payload !== null &&
        'message' in result.payload
          ? (result.payload as { message: string }).message
          : 'خطا در افزودن تسک'
      )
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (old: any) => {
        if (!old || !('todos' in old)) return old
        return {
          ...old,
          todos: [newTodo, ...old.todos],
          total: old.total + 1,
        }
      })
      reset()
    },
  })

  const onSubmit = (data: TodoPayload) => {
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-start justify-center gap-4 px-4 w-full"
    >
      <div className="w-full md:w-[20rem] md:min-h-[5.5rem] flex items-start">
        <Input
          placeholder="«افزودن مورد جدید به لیست…»"
          {...register('todo')}
          error={errors.todo?.message}
        />
      </div>

      <Button
        type="submit"
        icon={
          <FaPlusCircle className="   w-10 h-10  md:w-6 md:h-6 pointer-events-none" />
        }
        text="افزودن"
        className="bg-white  text-3xl md:text-xl  cursor-pointer text-yellow-400 hover:bg-yellow-400 hover:text-white transition-all  rounded-full flex items-center py-1 justify-center gap-8 md:gap-3 w-full md:w-[8rem] md:h-10 "
        loading={mutation.isPending}
      />

      <CustomSelect />
    </form>
  )
}
