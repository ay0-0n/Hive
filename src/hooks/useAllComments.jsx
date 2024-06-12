import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic';
const useAllComments = () => {
    const axiosPublic = useAxiosPublic();
    const {data : comments = [], refetch} = useQuery({
        queryKey: ['AllComments',],
        queryFn: async () => {
            const res = await axiosPublic.get('/comments');
            return res.data
        },
    }
    )
    return [comments, refetch]
};

export default useAllComments;