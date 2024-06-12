import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from "../auth/AuthProvider";

const useMyRecentPosts = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext)
    
    const {data : myRecentPosts = []} = useQuery({
        queryKey: ['myRecentPosts',],
        queryFn: async () => {
            const res = await axiosPublic.get(`/recent-posts/${user.email}`);
            return res.data
        },
    }
    )
    return [myRecentPosts]
};

export default useMyRecentPosts;