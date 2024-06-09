import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <p>Loading...</p>
    }
    if (user){
        return children;
    } 
    return <Navigate to="/join-us" state={{from:location}} replace/>
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

