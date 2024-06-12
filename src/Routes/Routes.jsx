import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import JoinUs from "../Pages/JoinUs/JoinUs";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Membership from "../Pages/Membership/Membership";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/User/AddPost";


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
                    element: <p>my-posts</p>
                },
                {
                    path:'/dashboard/manage-users',
                    element: <p>manage-users</p>
                },
                {
                    path:'/dashboard/reports',
                    element: <p>reports</p>
                },
                {
                    path:'/dashboard/make-announcement',
                    element: <p>announcement</p>
                },
            ]

        }
    ],
}]);