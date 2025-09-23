//1.HTML 요소 선택 
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

//2.할 일의 Type 정의
type Todo = {
  id: number;
  text: string;
}

let todos: Todo[] = []; //Todo의 배열 형태를 따름.
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
  todoList.innerHTML = '';
  doneList.innerHTML = ''; //비우지 않으면 기존에 있던 li들도 중복으로 반영됨.

  todos.forEach((todo): void => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  })

  doneTasks.forEach((todo): void => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  })
}

//3. 할 일 텍스트 입력 처리 함수 (공백 처리)
const getTodoText = (): string => {
  return todoInput.value.trim();
}

//4. 할 일 추가 처리 함수
const addTodo = (text: string): void => {
  todos.push({id: Date.now(), text: text});
  todoInput.value = ''; //입력창 비우기
  renderTasks();
}

//5. 할 일 상태 변경
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((item): boolean => item.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
}

//6. 해낸 일 삭제
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((item): boolean => item.id !== todo.id);
  renderTasks();
}

//7. 할 일 리스트 아이템 생성 함수(텍스트랑 버튼 넣기)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
  const li = document.createElement('li');
  li.classList.add('render-container__item');
  li.textContent = todo.text;

  const button = document.createElement('button');
  button.classList.add('render-container__item-button');

  if(isDone){
    button.textContent = '삭제';
    button.style.backgroundColor = '#f07f8aff';
  }else{
    button.textContent = '완료';
    button.style.backgroundColor = '#70d387ff';
  }

  button.addEventListener('click', (): void => {
    if(isDone){
      deleteTodo(todo);
    }else{
      completeTodo(todo);
    }
  })

  li.appendChild(button);
  return li;
}

//8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event) : void => {
  event.preventDefault();
  const text = getTodoText();
  if(text){
    addTodo(text);
  }
})