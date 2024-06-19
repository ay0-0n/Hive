import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllVotes = () => {
    const axiosPublic = useAxiosPublic();
    const { data: votes = [], refetch: votesRefetch } = useQuery({
        queryKey: ["AllVotes"],
        queryFn: async () => {
            const res = await axiosPublic.get("/votes");
            return res.data;
        },
    });

    return [votes, votesRefetch];
};

export default useAllVotes;