import { useReducer, useState } from "react"

interface IState {
  counter : number;
}
interface IAction {
  type : 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
}

function reducer(state: IState, action: IAction){
  const {type} = action;

  switch(type){
    case 'INCREASE': {
      return {
        ...state, // 원본 유지를 위한 스프레드 연산자
        counter: state.counter + 1,
      }
    }
    case 'DECREASE': {
      return {
        ...state,
        counter: state.counter - 1,
      }
    }
    case 'RESET_TO_ZERO': {
      return {
        ...state,
        counter: 0,
      }
    }
    default:
      return state;

  }
}
export const UseReducerPage = () => {
  // 1. useState
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  }

  // 2.useReducer
  const [state, dispatch] = useReducer(reducer, {
    counter : 0,
  });
  return (
    <>
      <div>
        <h2>useState</h2>
        <h3>useState 훅 사용 : {count}</h3>
        <button onClick={handleIncrease}>
          increase
        </button>
      </div>
      <div>
        <h2>useReducer</h2>
        <h3>useReducer 훅 사용 : {state.counter}</h3>
        <button onClick={() => dispatch({
          type: 'INCREASE',
        })}>
          increase
        </button>
        <button onClick={() => dispatch({
          type: 'DECREASE',
        })}>
          decrease
        </button>
        <button onClick={() => dispatch({
          type: 'RESET_TO_ZERO',
        })}>
          reset
        </button>
      </div>
    </>
  )
}
