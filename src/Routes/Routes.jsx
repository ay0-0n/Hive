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
            path: "/about",
            element: <p>About</p>,
        },
    ],
}]);