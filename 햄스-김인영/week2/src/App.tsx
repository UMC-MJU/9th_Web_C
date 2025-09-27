import './App.css'
import { Todo } from './components/Todo';
import { ThemeProvider } from './context/ThemeCotext';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App