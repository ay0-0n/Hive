import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query'

const useAllCommentReports = () => {
    const axiosPublic = useAxiosPublic();
    const {data : commentsReports = [], refetch} = useQuery({
        queryKey: ['AllCommentsReports',],
        queryFn: async () => {
            const res = await axiosPublic.get('/comments-reports');
            console.log(res.data);
            return res.data
        },
    }
    )

    return [commentsReports, refetch]
};

export default useAllCommentReports;