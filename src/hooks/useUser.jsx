import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";


const useUser = () => {
    
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data} = useQuery({
        queryKey: ['user ',user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data
        },
    }
    )

    return [data]
};

export default useUser;