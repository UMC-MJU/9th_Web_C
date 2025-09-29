import { useTodo } from '../context/TodoContext';

export const TodoForm = () => {
    const {input, setInput, addTodo} = useTodo();

    //텍스트 입력
    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    }
    
    //할일 추가
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addTodo();
    }
  return (
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
  )
}
