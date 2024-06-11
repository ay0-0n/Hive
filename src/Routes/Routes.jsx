import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import JoinUs from "../Pages/JoinUs/JoinUs";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Membership from "../Pages/Membership/Membership";


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
            element: <PrivateRoute><Dashboard/></PrivateRoute>
        }
    ],
}]);