import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import JoinUs from "../Pages/JoinUs/JoinUs";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Membership from "../Pages/Membership/Membership";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/User/AddPost";
import MyPosts from "../Pages/Dashboard/User/MyPosts";
import Post from "../Pages/Post/Post";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Reports from "../Pages/Dashboard/Admin/Reports";
import Announcement from "../Pages/Dashboard/Admin/Announcement";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Payment from "../Pages/Payment/Payment";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([{
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: '/post/:id',
            element: <Post/>
        },
        {
            path: "/membership",
            element: <PrivateRoute><Membership/></PrivateRoute>,
        },
        {
            path: "/payment",
            element: <PrivateRoute><Payment/></PrivateRoute>,
        },
        {
            path: "/join-us",
            element: <JoinUs/>,
        },
        {
            path: "/dashboard",
            element: <PrivateRoute><Dashboard/></PrivateRoute>,
            children: [
                {
                    path:'/dashboard/',
                    element: <MyProfile/>
                },
                {
                    path:'/dashboard/add-post',
                    element: <AddPost/>
                },
                {
                    path:'/dashboard/my-posts',
                    element: <MyPosts/>
                },
                {
                    path:'/dashboard/manage-users',
                    element: <AdminRoute><ManageUsers/></AdminRoute>
                },
                {
                    path:'/dashboard/reports',
                    element: <AdminRoute><Reports/></AdminRoute>
                },
                {
                    path:'/dashboard/make-announcement',
                    element: <AdminRoute><Announcement/></AdminRoute>
                },
            ]

        }
    ],
}]);