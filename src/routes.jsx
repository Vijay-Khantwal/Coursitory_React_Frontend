import { createBrowserRouter } from 'react-router-dom';
import VideoPage from './pages/VideoPage/VideoPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Singup';
import Landing from './pages/Landing/Landing';
import CoursePage from './pages/Courses/CoursePage';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import NotFound from './pages/404ErrorPage/NotFound';
import CourseDetails from './pages/Courses/CourseDetails';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
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
        path:'/courseDetails/:id',
        element : <CourseDetails/>
    },
    {
        path:'/videoPage/:courseId/:vidId',
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
    {
        path: '*',
        element: <NotFound />
    },
]);

export default routes;
