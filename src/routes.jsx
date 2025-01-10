import CourseDetails from './pages/CourseDetails';
import { createBrowserRouter } from 'react-router-dom';
import VideoPage from './pages/VideoPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Singup';
import Landing from './pages/Landing/Landing';
import CoursePage from './pages/Courses/CoursePage';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
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
        element: <CoursePage />
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
    },
    {
        path:'/admin/dashboard',
        element : <AdminDashboard/>
    },
]);

export default routes;
