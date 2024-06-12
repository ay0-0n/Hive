import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query'

const useAllTags = () => {
    const axiosPublic = useAxiosPublic();
    const {data : tags = []} = useQuery({
        queryKey: ['alTags',],
        queryFn: async () => {
            const res = await axiosPublic.get('/tags');
            return res.data
        },
    }
    )
    return [tags]
};

export default useAllTags;