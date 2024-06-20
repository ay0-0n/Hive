import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const AdminRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {data:currUser} = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`);
            return res.data;
        },
    });
    if(currUser?.role === "admin"){
        return children;
    }
    return <Navigate to="/dashboard" replace/>
};
PropTypes.AdminRoute = {
    children: PropTypes.node,
};

export default AdminRoute;