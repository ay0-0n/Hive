import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Reports = () => {
  const [current, setCurrent] = useState("posts");
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: PostReports,
    isLoading: postLoading,
    error: postError,
    refetch: refetchPostReports,
  } = useQuery({
    queryKey: ["Reports-posts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/post-reports/report");
      return res.data;
    },
  });

  const {
    data: CommentReports,
    isLoading: commentLoading,
    error: commentError,
    refetch: refetchCommentReports,
    } = useQuery({
    queryKey: ["Reports-comments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/comment-reports/report");
      return res.data;
    },
    });

  const postDelete = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/post/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Post deleted successfully",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to delete post",
      });
    },
  });

  const commentDelete = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/comments/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Comment deleted successfully",
      });
    },
    onError: () => {
        Swal.fire({
          icon: "error",
          title: "Failed to delete post",
        });
      },
    });

  const postReportDelete = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/post-reports/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Post report deleted successfully",
        
      });
      refetchPostReports();
    },
    onError: (error) => {
        console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete post report",
      });
    },
  });

  const commentsReportsDelete = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/comment-reports/${id}`),
    onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Comment report deleted successfully",
          
        });
        refetchCommentReports();
      },
      onError: (error) => {
          console.log(error);
        Swal.fire({
          icon: "error",
          title: "Failed to delete comment report",
        });
      },
    });

    const allPostReportDelete = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/post-reports/all/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Report deleted successfully",
      });
      refetchPostReports();
    },
    onError: () => {
        Swal.fire({
            icon: "error",
            title: "Failed to delete report",
        });
        }
    });

    const allCommentReportDelete = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/comment-reports/all/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Report deleted successfully",
      });
      refetchCommentReports();
    },
    onError: () => {
        Swal.fire({
            icon: "error",
            title: "Failed to delete report",
        });
        }
    });


  const handlePostDelete = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        postDelete.mutate(postId);
        allPostReportDelete.mutate(postId);
      }
    });
  };

  const handlePostReportDelete = (id) => () => {
    postReportDelete.mutate(id);
  };

  const handleCommentDelete = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        commentDelete.mutate(commentId);
        allCommentReportDelete.mutate(commentId);
      }
    });
  };

  const handleCommentReportDelete = (id) => () => {
    commentsReportsDelete.mutate(id);
  };    

  return (
    <div className="min-w-full">
      <div className="bg-cyan-900 w-full h-56 md:h-52 relative">
        <div className="text-center pt-8">
          <p className="text-xl md:text-3xl font-medium text-white">Reports</p>
          <p className="text-md md:text-xl text-gray-300">
            Handle all reports here
          </p>
        </div>
        <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto absolute left-1/2 transform -translate-x-1/2 top-28 md:top-28 bg-white rounded-xl max-w-[70rem] shadow-lg p-4 border-2 border-gray-400">
          <div className="w-full flex justify-between items-center">
            <button
              className={`w-1/2 text-center border-r-2 border-b-2 pb-2 font-medium ${
                current === "posts" && "border-b-customBlue text-customBlue"
              }`}
              onClick={() => setCurrent("posts")}
            >
              Posts
            </button>
            <button
              className={`w-1/2 text-center pb-2 border-b-2 font-medium ${
                current === "comments" && "border-b-customBlue text-customBlue"
              }`}
              onClick={() => setCurrent("comments")}
            >
              Comments
            </button>
          </div>
          {current === "posts" && (
            <div className="mt-4 space-y-4">
                {postLoading && <p>Loading...</p>}
                {postError && <p>Error loading reports</p>}
              {PostReports?.map((report) => (
                <div
                  key={report._id}
                  className="p-4 border rounded-lg shadow-md bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {report.postTitle}
                    </h3>
                    <p className="text-red-500">{report.feedback}</p>
                    <p className="text-gray-500">
                      Reported By: {report.reporterEmail}
                      <br />
                      Report Date: {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <AwesomeButton
                      onPress={() =>
                        handlePostDelete(report.postID, report._id)
                      }
                      type="danger"
                    >
                      <FaTrash />
                    </AwesomeButton>
                    <AwesomeButton
                      onPress={handlePostReportDelete(report._id)}
                      type="primary"
                      style={{
                        "--button-primary-color": "grey",
                        "--button-primary-color-dark": "#3d8b95",
                        "--button-primary-color-hover": "#3d8b95",
                      }}
                    >
                      <span className="text-white font-extrabold text-lg">x</span>
                    </AwesomeButton>
                  </div>
                </div>
              ))}
            </div>
          )}
          {current === "comments" && 
          <div>
            {commentLoading && <p>Loading...</p>}
              {commentError && <p>Error loading reports</p>}
              {CommentReports?.map((report) => (
                <div
                  key={report._id}
                  className="p-4 border rounded-lg shadow-md bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      Comment ID: {report.comment}
                    </h3>
                    <p className="text-red-500">{report.feedback}</p>
                    <p className="text-gray-500">
                      Reported By: {report.reporterEmail}
                      <br />
                      Report Date: {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <AwesomeButton
                      onPress={() =>
                        handleCommentDelete(report.commentID)
                      }
                      type="danger"
                    >
                      <FaTrash />
                    </AwesomeButton>
                    <AwesomeButton
                      onPress={handleCommentReportDelete(report._id)}
                      type="primary"
                      style={{
                        "--button-primary-color": "grey",
                        "--button-primary-color-dark": "#3d8b95",
                        "--button-primary-color-hover": "#3d8b95",
                      }}
                    >
                      <span className="text-white font-extrabold text-lg">x</span>
                    </AwesomeButton>
                  </div>
                </div>
              ))}
            
        </div>}
        </div>
      </div>
    </div>
  );
};

export default Reports;
