import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';


const useAnnouncements = () => {
    const axiosSecure = useAxiosSecure();
    const {data : announcements = [], refetch: announcemnetRefetch} = useQuery({
        queryKey: ['announcements',],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data
        },
    }
    )

    return [announcements, announcemnetRefetch]
};

export default useAnnouncements;