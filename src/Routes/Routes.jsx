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


export const router = createBrowserRouter([{
    path: "/",
    element: <Root/>,
    errorElement: <p>404</p>,
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
                    element: <ManageUsers/>
                },
                {
                    path:'/dashboard/reports',
                    element: <Reports/>
                },
                {
                    path:'/dashboard/make-announcement',
                    element: <Announcement/>
                },
            ]

        }
    ],
}]);