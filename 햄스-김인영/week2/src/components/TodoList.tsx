interface Todo {
  id: number;
  text: string;
}

interface TodoListType {
  title: string;
  todos: Todo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (id: number) => void;
}

export const TodoList = ({title, todos, buttonLabel, buttonColor, onClick}: TodoListType) => {

  //투두 리스트 map
    const todoList = todos.map((todo) => 
      <li className='render-container__item' key={todo.id}>{todo.text}
        <button
          className='render-container__item-button'
          style={{backgroundColor: buttonColor}}
          onClick={() => onClick(todo.id)}>
            <span className='render-container__item-text'>{buttonLabel}</span>
        </button>
      </li>
    )

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list">
        {todoList}
      </ul>
    </div>
  )
}
