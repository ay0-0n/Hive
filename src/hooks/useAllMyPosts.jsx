import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query'
import useUser from "./useUser";

const useAllMyPosts = () => {
    const axiosPublic = useAxiosPublic();   
    const [user] = useUser()
    const {data : myPosts = []} = useQuery({
        queryKey: ['AllMYPosts',user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts/${user.email}`);
            console.log('myPosts:',res)
            return res.data
        },
    }
    )
    return [myPosts]
};

export default useAllMyPosts;