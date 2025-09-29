import { useState } from 'react';

function TodoBefore() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([]);

  interface Todo {
    id: number;
    text: string;
  }

  //텍스트 입력
  const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  //할 일 추가
  const addTodo = (): void => {
    const newTodo : Todo = {
      id: Date.now(),
      text: input,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  }

  //할 일 리스트 -> 완료 리스트 옮기기
  const completeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));

    const done = todos.find((todo) => todo.id === id);
    if(done){
    setDoneTasks((prev) => [...prev, done]);
    }
  }

  //완료 리스트 삭제
  const deleteTodo = (id: number): void => {
    setDoneTasks(doneTasks.filter((done) => done.id !== id));
  }

  //할일 추가
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  }

  //투두 리스트 map
  const todoList = todos.map((todo) => 
    <li className='render-container__item' key={todo.id}>{todo.text}
      <button
        className='render-container__item-button'
        style={{backgroundColor: '#ff4b4b'}}
        onClick={() => completeTodo(todo.id)}>
          <span className='render-container__item-text'>완료</span>
      </button>
    </li>
  )
  //완료 리스트 map
  const doneList = doneTasks.map((done) =>
    <li className='render-container__item' key={done.id}>{done.text}
      <button
        className='render-container__item-done-button'
        style={{backgroundColor: '#70ca8e'}}
        onClick={() => deleteTodo(done.id)}>
          <span className='render-container__item-text'>삭제</span>
      </button>
    </li>
  )

  return (
     <>
        <div className="todo-container">
          <h1 className="todo-container__header">YONG TODO</h1>
          <form id="todo-form" className="todo-container__form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="todo-input"
              className="todo-container__input"
              placeholder="할 일 입력"
              value={input}
              required
              onChange={inputText}
            />
            <button type="submit"
              className="todo-container__button"
              >추가</button>
          </form>
          <div className="render-container">
            <div className="render-container__section">
              <h2 className="render-container__title">할 일</h2>
              <ul id="todo-list" className="render-container__list">
                {todoList}
              </ul>
            </div>
            <div className="render-container__section">
              <h2 className="render-container__title">완료</h2>
              <ul id="done-list" className="render-container__list">
                {doneList}
              </ul>
            </div>
          </div>
        </div>
     </>
  )
}

export default TodoBefore