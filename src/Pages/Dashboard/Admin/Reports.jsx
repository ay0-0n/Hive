import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Reports = () => {
    const [current, setCurrent] = useState("posts");
    const axiosSecure = useAxiosSecure();
    
    const {data:PostReports, isLoading:postLoading, error:postError} = useQuery({
        queryKey: ["Reports-posts"],
        queryFn: async () => {
            const res = await axiosSecure.get("/post-reports/report");
            return res.data;
        },
    });

    const {data:CommentReports, isLoading:commentLoading, error:commentError} = useQuery({
        queryKey: ["Reports-comments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/comment-reports/report");
            return res.data;
        },
    });

    console.log(PostReports);
    console.log(CommentReports);

    return (
        <div className="min-w-full">
            <div className="bg-cyan-900 w-full h-56 md:h-52 relative">
                <div className="text-center pt-8">
                    <p className="text-xl md:text-3xl font-medium text-white">
                        Reports
                    </p>
                    <p className="text-md md:text-xl text-gray-300">
                        Handle all reports here
                    </p>
                </div>
                <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto absolute left-1/2 transform -translate-x-1/2 top-28 md:top-28 bg-white rounded-xl max-w-[70rem] shadow-lg p-4 border-2 border-gray-400">
                    <div className="w-full flex justify-between items-center">
                        <button
                            className={`w-1/2 text-center border-r-2 border-b-2 pb-2 font-medium ${current === 'posts' && 'border-b-customBlue text-customBlue'}`}
                            onClick={() => setCurrent('posts')}
                        >
                            Posts
                        </button>
                        <button
                            className={`w-1/2 text-center pb-2 border-b-2 font-medium ${current === 'comments' && 'border-b-customBlue text-customBlue'}`}
                            onClick={() => setCurrent('comments')}
                        >
                            Comments
                        </button>
                    </div>
                    {/* Content here */}
                    {current === 'posts' && (
                        <div>
                            {/*Post Reports here */}
                        </div>
                    )}
                    {current === 'comments' && (
                        <div>
                            {/*Comment Reports here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
