import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { useTodo } from '../context/TodoContext'

export const Todo = () => {
  const {todos, doneTasks, completeTodo, deleteTodo} = useTodo();

  return (
    <div className="todo-container">
          <h1 className="todo-container__header">YONG TODO</h1>
          <TodoForm />
          <div className="render-container">
            <TodoList 
              title='할 일'
              todos={todos}
              buttonLabel='완료'
              buttonColor='#70ca8e'
              onClick={completeTodo}
            />
            <TodoList 
              title='완료'
              todos={doneTasks}
              buttonLabel='삭제'
              buttonColor='#ff4b4b'
              onClick={deleteTodo}
            />
          </div>
        </div>
  )
}
