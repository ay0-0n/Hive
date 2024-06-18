import { useQuery } from '@tanstack/react-query'
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useAxiosPublic from './useAxiosPublic';


const useUser = () => {
    
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    
    const {data: userData = [], refetch} = useQuery({
        queryKey: ['user ',user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`);
            return res.data
        },
    }
    )

    return [userData, refetch]
};

export default useUser;