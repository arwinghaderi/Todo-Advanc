import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Item from './TodoItem'
import { Todo } from '@/types/todo'

export default function SortableItem({ todo }: { todo: Todo }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Item todo={todo} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  )
}
