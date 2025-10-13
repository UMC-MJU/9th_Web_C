import './App.css';
import HomePage from './pages/HomePage'; 
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element:<HomePage/>,
    errorElement : <NotFoundPage/>,
    children: [
      // 기본 진입 시 인기 영화로 이동
      {
        index: true,
        element: <Navigate to="/movies/popular" replace />,
      },
      {
        path : 'movies/:category',
        element: <MoviePage/>,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage/>,
      },
      
    ],
  },
]);

function App(){
  return <RouterProvider router={router}/>;
}

export default App;