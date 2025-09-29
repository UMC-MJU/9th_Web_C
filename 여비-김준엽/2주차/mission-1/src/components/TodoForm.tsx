import { FormEvent, useState } from 'react';
import React from 'react';
import { JSX } from 'react';

const TodoForm = (): JSX.Element => {
    const [input, setInput = useState<string>('');
    const { addTodo }= useTodo();
    
    const handleSubmit = (e : FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        const text = input.trim();

        if(text){
            const newTodo : TTodo = {id: Date.now(), text};
            setTodos((prevTodos) : any[] => [...prevTodos, 
            newTodo]);
            setInput('');
        }
    };
    return(
        <form onSubmit={handleSubmit} className='todo-container__form'>
            <input 
                value={input}
                onChange={(e) : void => setInput(e.target.value)}
                type='text'
                className='todo-container__input'
                placeholder="할 일 입력"
                required
            />
            <button type='submit' className='todo-container__button'>
                할 일 추가
            </button>
        </form>
        );
};

export default TodoForm;