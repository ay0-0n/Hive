import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';


const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data : users = [], refetch} = useQuery({
        queryKey: ['AllUsers ',],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        },
    }
    )

    return [users, refetch]
};

export default useAllUsers;