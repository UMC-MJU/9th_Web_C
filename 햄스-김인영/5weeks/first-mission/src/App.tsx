import './App.css'
import {RouterProvider} from 'react-router-dom'
import router from './routers/router.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
