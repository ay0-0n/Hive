import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useAllCommentReports = () => {
    const axiosSecure = useAxiosSecure();
    const {data : commentsReports = [], refetch} = useQuery({
        queryKey: ['AllCommentsReports',],
        queryFn: async () => {
            const res = await axiosSecure.get('/comments-reports');
            console.log(res.data);
            return res.data
        },
    }
    )

    return [commentsReports, refetch]
};

export default useAllCommentReports;