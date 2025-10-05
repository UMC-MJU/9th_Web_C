import {Outlet} from 'react-router-dom';
import {Navbar} from '../components/Navbar'
const HomePage = () =>{
    return( 
    <>
        <Navbar/>
        {/*자식 라우트 요소가 렌더링될 위치를 표시*/}
        <Outlet/>
    </>
    );
};

export default HomePage;