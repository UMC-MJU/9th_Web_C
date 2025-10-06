import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routers/router.tsx'

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
