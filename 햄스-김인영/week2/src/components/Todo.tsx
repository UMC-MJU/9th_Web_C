import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { useTodo } from '../context/TodoContext'
import { ThemeToggleButton } from './ThemeToggleButton';
import { THEME, useTheme } from '../context/ThemeCotext';
import { useEffect } from 'react';

export const Todo = () => {
  const { todos, doneTasks, completeTodo, deleteTodo } = useTodo();
  const { theme } = useTheme();
  
  const isLightMode = theme === THEME.LIGHT; 

  useEffect(() => {
    document.body.style.backgroundColor =
      isLightMode ? "aliceblue" : "#2e3037ff" ;
  }, [theme]);

  return (
    <div className="todo-container">
      <ThemeToggleButton />
      <h1 className="todo-container__header">TODO LIST</h1>
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
          buttonColor='#e56969ff'
          onClick={deleteTodo}
        />
      </div>
    </div>
  )
}
