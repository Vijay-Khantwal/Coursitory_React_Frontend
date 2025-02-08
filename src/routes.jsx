import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from 'react-router-dom';
import { lazy } from "react";
const VideoPage = lazy(() => import("./pages/VideoPage/VideoPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Singup"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const CoursePage = lazy(() => import("./pages/Courses/CoursePage"));
const AdminDashboard = lazy(() => import("./pages/AdminPages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/404ErrorPage/NotFound"));
const CourseDetails = lazy(() => import("./pages/Courses/CourseDetails"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/courses",
    element: <CoursePage />,
  },
  {
    path: "/courseDetails/:id",
    element: <CourseDetails />,
  },
  {
    path: "/videoPage/:courseId/:vidId",
    element: <VideoPage />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}
