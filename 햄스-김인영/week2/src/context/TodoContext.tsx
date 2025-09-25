import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

interface Todo {
  id: number;
  text: string;
}

interface TodoContextInterface {
  input: string;
  todos: Todo[];
  doneTasks: Todo[];
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  addTodo: () => void;
}

const TodoContext = createContext<TodoContextInterface | undefined>(undefined);

export const TodoProvider = ({children}: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  //할 일 추가
  const addTodo = (): void => {
    const createTodo: Todo = {
      id: Date.now(),
      text: input,
    };
    setTodos((prev) => [...prev, createTodo]);
    setInput('');
  };

  //할 일 리스트 -> 완료 리스트 옮기기
  const completeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));

    const done = todos.find((todo) => todo.id === id);
    if (done) {
      setDoneTasks((prev) => [...prev, done]);
    }
  };

  //완료 리스트 삭제
  const deleteTodo = (id: number): void => {
    setDoneTasks(doneTasks.filter((done) => done.id !== id));
  };

  return (
  <TodoContext.Provider
    value={{ todos, doneTasks, input, addTodo, completeTodo, deleteTodo }}>
    {children}
  </TodoContext.Provider>
  )
};

export const useTodo = (): TodoContextInterface => {
  const context = useContext(TodoContext);
  if(!context){
    throw new Error(
      'useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.'
    );
  }
  return context;
}
