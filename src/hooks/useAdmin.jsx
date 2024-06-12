import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin } = useQuery({
         queryKey: ['isAdmin'],
         queryFn: async () => {
              const res = await axiosSecure.get(`/user/admin/${user.email}`);
            return res.data?.admin;
         },
    });
    return [isAdmin];
};

export default useAdmin;