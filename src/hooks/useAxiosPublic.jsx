import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://hive-forum.vercel.app'
    });

    return axiosPublic;
};

export default useAxiosPublic;