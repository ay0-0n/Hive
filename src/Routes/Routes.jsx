import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";


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
            element: <p>member</p>,
        },
        {
            path: "/login",
            element: <p>login</p>,
        },
        {
            path: "/join-us",
            element: <p>join us</p>,
        }
    ],
}]);