import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query'

const useAllCommentReports = () => {
    const axiosPublic = useAxiosPublic();
    const {data : commentsReports = [], refetch:commentReportsRefetch} = useQuery({
        queryKey: ['AllCommentsReports',],
        queryFn: async () => {
            const res = await axiosPublic.get('/comments-reports');
            return res.data
        },
    }
    )

    return [commentsReports, commentReportsRefetch]
};

export default useAllCommentReports;