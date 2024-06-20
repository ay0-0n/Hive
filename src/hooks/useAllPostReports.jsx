import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query'

const useAllPostReports = () => {
    const axiosPublic = useAxiosPublic();
    const {data : postReports = [], refetch} = useQuery({
        queryKey: ['AllPostReports',],
        queryFn: async () => {
            const res = await axiosPublic.get('/post-reports');
            return res.data
        },
    }
    )

    return [postReports, refetch]
};

export default useAllPostReports;