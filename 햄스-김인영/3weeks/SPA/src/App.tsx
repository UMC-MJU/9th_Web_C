import './App.css'
import { Link, Route, Routes } from './components/router';

const HamsterPage = () => <h1>Hamster</h1>;
const CatPage = () => <h1>Cat</h1>;
const RaccoonPage = () => <h1>Raccoon</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to='/hamster'>Hamster</Link>
      <Link to='/cat'>Cat</Link>
      <Link to='/raccoon'>Raccoon</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/hamster' component={HamsterPage} />
        <Route path='/cat' component={CatPage} />
        <Route path='/raccoon' component={RaccoonPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  )
}

export default App
