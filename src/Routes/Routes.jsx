import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import JoinUs from "../Pages/JoinUs/JoinUs";
import PrivateRoute from "./PrivateRoute";


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
            element: <PrivateRoute><p>member</p></PrivateRoute>,
        },
        {
            path: "/join-us",
            element: <JoinUs/>,
        }
    ],
}]);