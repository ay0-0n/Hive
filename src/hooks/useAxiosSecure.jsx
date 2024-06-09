import axios from "axios";

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    });

    return axiosSecure;
};

export default useAxiosSecure;