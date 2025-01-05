import CourseList from './pages/CourseList';
import CourseDetails from './pages/CourseDetails';
import { createBrowserRouter } from 'react-router-dom';
import VideoPage from './pages/VideoPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Singup';
import Landing from './pages/Landing/Landing';
const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Signup />
    },
    {
        path: '/courses',
        element: <CourseList />
    },
    {
        path:'/courseDetails',
        element : <CourseDetails/>
    },
    {
        path:'/videoPage',
        element : <VideoPage/>
    },
    {
        path:'/landing',
        element : <Landing/>
    }
]);

export default routes;
