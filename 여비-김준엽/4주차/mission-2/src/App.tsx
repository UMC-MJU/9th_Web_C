import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지
//4. 404 페이지
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      { index: true, element: <HomePage/> },
      {path: "login", element: <LoginPage/>},
      {path: "signup", element: <SignupPage/>},
    ],
    errorElement: <NotFoundPage/>,
  },
]);

function App() {
  return <RouterProvider router={router}/>; 
}

export default App;
