import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic';


const useAllUsers = () => {
    const axiosPublic = useAxiosPublic();
    const {data : users = [], refetch} = useQuery({
        queryKey: ['AllUsers ',],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data
        },
    }
    )

    return [users, refetch]
};

export default useAllUsers;