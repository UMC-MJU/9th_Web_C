import './App.css'
import {Provider} from 'react-redux';
import { CartList } from './components/CartList'
import { Navbar } from './components/Navbar'
import store from './store/store'
import { ClearList } from './components/clearList';

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <ClearList />
    </Provider>
  )
}

export default App
