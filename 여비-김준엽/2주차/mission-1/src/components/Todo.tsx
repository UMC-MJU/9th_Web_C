import { JSX} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {useTodo} from '../context/TodoContext';

const Todo =() : JSX.Element => {
    const {todos, doneTodos, completeTodo, deleteTodo} = useTodo();

    return(
    <div className ='todo-container'>
        <h1 className='todo-container__header'>Yeop Todo</h1>
         <TodoForm/>
        <div className='render-container'>
            <TodoList 
            title='할 일'
            todos={todos} 
            buttonLabel='완료'
            buttonColor='#28a745'
             onClick={completeTodo}
            />
            <TodoList 
            title='완료' 
            todos={doneTodos} 
            buttonLabel='삭제'
            buttonColor='#dc3545'
            onClick={deleteTodo}
            />
        </div> 
    </div> 
    );
};

export default Todo;

