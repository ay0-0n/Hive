import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePostComments = ({post_id}) => {
    const axiosPublic = useAxiosPublic();
    const {data : comments = [], refetch} = useQuery({
        queryKey: ['comments', post_id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comments/${post_id}`);
            return res.data
        },
    }
    )
    return [comments, refetch]
};

export default usePostComments;