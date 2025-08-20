import Item from './TodoItem'

export default function List() {
  const todos = ['یادگیری ریداکس', 'ساخت اپ با نکست‌جی‌اس', 'دیپلوی روی ورسل']

  return (
    <div className="flex justify-center w-2/3 items-center px-4">
      <ul className="w-full md:w-1/2 list-none">
        {todos.map((todo, index) => (
          <Item key={index} text={todo} />
        ))}
      </ul>
    </div>
  )
}
