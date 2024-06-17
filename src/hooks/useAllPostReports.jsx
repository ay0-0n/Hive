import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useAllPostReports = () => {
    const axiosSecure = useAxiosSecure();
    const {data : postReports = [], refetch} = useQuery({
        queryKey: ['AllPostReports',],
        queryFn: async () => {
            const res = await axiosSecure.get('/post-reports');
            console.log(res.data);
            return res.data
        },
    }
    )

    return [postReports, refetch]
};

export default useAllPostReports;