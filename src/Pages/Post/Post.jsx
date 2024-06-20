import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAllVotes from "../../hooks/useAllVotes";
import useUser from "../../hooks/useUser";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaWhatsapp,
  FaLinkedin,
  FaFacebookSquare,
  FaFacebookMessenger,
  FaTelegram,
  FaComments,
} from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  TelegramShareButton,
  EmailShareButton,
} from "react-share";
import Swal from "sweetalert2";
import useAllUsers from "../../hooks/useAllUsers";
import { FaXTwitter } from "react-icons/fa6";
import { MdDelete, MdEmail, MdOutlineReportProblem } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllPostReports from "../../hooks/useAllPostReports";
import useAllComments from "../../hooks/useAllComments";
import useAllCommentReports from "../../hooks/useAllCommentReports";

const Post = () => {
  const { id } = useParams();
  const [user] = useUser();
  const axiosPublic = useAxiosPublic();

  const { data: post } = useQuery({
    queryKey: ["Post", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/post/${id}`);
      return res.data;
    },
  });

  const [votes, votesRefetch] = useAllVotes();
  const { data: myVotes = [], refetch: myVotesRefetch } = useQuery({
    queryKey: ["MyVotes", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/votes/${user?.email}`);
      return res.data;
    },
  });

  const [users] = useAllUsers();

  const handleVote = async (postId, voteType) => {
    if (!user || user.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to login to vote!",
      });
      return;
    }

    const vote = myVotes.find((vote) => vote.postId === postId);
    if (!vote) {
      await axiosPublic.post("/votes", {
        user: user.email,
        postId,
        voteType,
        date: new Date().toISOString(),
      });
      myVotesRefetch();
      votesRefetch();
    } else if (vote.voteType === voteType) {
      await axiosPublic.delete(`/votes/${vote._id}`);
      myVotesRefetch();
      votesRefetch();
    } else if (vote.voteType !== voteType) {
      await axiosPublic.patch(`/votes/${vote._id}`, {
        voteType,
        date: new Date().toISOString(),
      });
      myVotesRefetch();
      votesRefetch();
    }
  };

  const [commentReports, commentReportsRefetch] = useAllCommentReports();

  const [reportDisabled, setReportDisabled] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [postReports, postReportsRefetch] = useAllPostReports();
  const [reportModal, setReportModal] = useState("");
  const [commentReportModal, setCommentReportModal] = useState("");
  const [commentReportDisabled, setCommentReportDisabled] = useState(true);

  console.log(commentReports);

  const reportedCommentMutation = useMutation({
    mutationFn: async (report) => {
      const res = await axiosSecure.post("/comment-reports", report);
      return res.data;
    },
    onSuccess: () => {
      setCommentReportModal("hidden");
      Swal.fire("Reported!", "Your report has been submitted.", "success");
      commentReportsRefetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while reporting the comment!",
      });
    },
  });
  const handleReportComment = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    reportedCommentMutation.mutate({
      commentID: e.target.commentID.value,
      reporterEmail: user.email,
      feedback,
      date: new Date().toISOString(),
    });
  };

  const reportedPostMutation = useMutation({
    mutationFn: async (report) => {
      const res = await axiosSecure.post("/post-reports", report);
      return res.data;
    },
    onSuccess: () => {
      setReportModal("hidden");
      Swal.fire("Reported!", "Your report has been submitted.", "success");
      postReportsRefetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while reporting the post!",
      });
    },
  });

  const handleReportPost = async (e) => {
    e.preventDefault();

    const feedback = e.target.feedback.value;
    reportedPostMutation.mutate({
      postID: id,
      reporterEmail: user.email,
      feedback,
      date: new Date().toISOString(),
    });
  };

  const timeSince = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  const postAuthor = users.find((user) => user.email === post?.owner);

  const [comments, commentsRefetch] = useAllComments();

  const commentTextareaRef = useRef();

  const commentPost = useMutation({
    mutationFn: async (comment) => {
      const res = await axiosPublic.post("/comments", comment);
      return res.data;
    },
    onSuccess: () => {
      commentsRefetch();
      if (commentTextareaRef.current) {
        commentTextareaRef.current.value = "";
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while commenting!",
      });
    },
  });

  const [commentID, setCommentID] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || user.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to login to comment!",
      });
      return;
    }
    const comment = e.target.comment.value;
    commentPost.mutate({
      postID: id,
      email: user.email,
      name: user.name,
      photo: user.photo,
      comment,
      date: new Date().toISOString(),
    });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {post && postAuthor && (
          <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src={postAuthor.photo}
                alt={postAuthor.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-black">
                  {postAuthor.name}
                </h2>
                <p className="text-gray-600">
                  @{postAuthor.email.split("@")[0]}
                </p>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-black">
              {post.title}
            </h3>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">#{post.tag}</span>
              <span className="text-gray-500">{timeSince(post.dateAdded)}</span>
            </div>
            <hr className="w-full" />
            <div className="flex justify-between items-center mb-4 mt-3">
              <div className="flex flex-row justify-start items-center gap-4">
                <button
                  className={`flex items-center text-gray-500 ${
                    myVotes.find((vote) => vote.postId === post._id)
                      ?.voteType === "up"
                      ? "text-blue-500"
                      : ""
                  }`}
                  onClick={() => handleVote(post._id, "up")}
                >
                  <FaThumbsUp className="mr-1" />{" "}
                  {
                    votes.filter(
                      (vote) =>
                        vote.postId === post._id && vote.voteType === "up"
                    ).length
                  }
                </button>
                <button
                  className={`flex items-center text-gray-500 ${
                    myVotes.find((vote) => vote.postId === post._id)
                      ?.voteType === "down"
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => handleVote(post._id, "down")}
                >
                  <FaThumbsDown className="mr-1" />{" "}
                  {
                    votes.filter(
                      (vote) =>
                        vote.postId === post._id && vote.voteType === "down"
                    ).length
                  }
                </button>
                <button className="flex justify-center items-center text-gray-500">
                  <FaComments className="mr-1" />{" "}
                  {
                    comments.filter((comment) => comment.postID === post._id)
                      .length
                  }
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <div>
                  <button
                    className="btn bg-white border-none py-0 px-0 hover:bg-white"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <FaShare className="text-black bg-white text-lg" />
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box bg-white">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg text-black">Share</h3>
                      <hr />
                      <div className="py-8">
                        <div className="flex justify-center gap-5 items-center">
                          <FacebookShareButton url={window.location.href}>
                            <FaFacebookSquare className="text-gray-600 text-3xl hover:text-blue-600" />
                          </FacebookShareButton>
                          <FacebookMessengerShareButton
                            url={window.location.href}
                          >
                            <FaFacebookMessenger className="text-gray-600 text-3xl hover:text-blue-600" />
                          </FacebookMessengerShareButton>
                          <TelegramShareButton url={window.location.href}>
                            <FaTelegram className="text-gray-600 text-3xl hover:text-cyan-600" />
                          </TelegramShareButton>
                          <TwitterShareButton url={window.location.href}>
                            <FaXTwitter className="text-gray-600 text-3xl hover:text-black" />
                          </TwitterShareButton>
                          <LinkedinShareButton url={window.location.href}>
                            <FaLinkedin className="text-gray-600 text-3xl hover:text-blue-600" />
                          </LinkedinShareButton>
                          <WhatsappShareButton url={window.location.href}>
                            <FaWhatsapp className="text-gray-600 text-3xl hover:text-green-700" />
                          </WhatsappShareButton>
                          <EmailShareButton url={window.location.href}>
                            <MdEmail className="text-gray-600 text-3xl hover:text-red-600" />
                          </EmailShareButton>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>
                {user && user.email !== post.owner && (
                  <div>
                    <button
                      className="btn bg-white border-none py-0 px-0 hover:bg-white"
                      onClick={() => {
                        const res = postReports?.find(
                          (report) =>
                            report.postID === post?._id &&
                            report.reporterEmail === user?.email
                        );
                        if (user.length === 0) {
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "You need to login to report!",
                          });
                          return;
                        }
                        if (res) {
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "You have already reported this post!",
                          });
                        } else {
                          document.getElementById("my_modal_2").showModal();
                        }
                      }}
                    >
                      <MdOutlineReportProblem className="text-red-400 text-lg" />
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className={`modal-box bg-white ${reportModal}`}>
                        <h3 className="font-bold text-lg text-black">
                          Report This Post
                        </h3>
                        <hr />
                        <div className="mt-6 flex justify-center items-center">
                          <form
                            onSubmit={handleReportPost}
                            className="w-full flex justify-center items-center gap-2"
                            method="dialog"
                          >
                            <select
                              className="border border-gray-300 rounded p-2 bg-white focus:outline-red-200 text-gray-800"
                              required
                              name="feedback"
                              onChange={(e) => {
                                setReportDisabled(e.target.value === "");
                              }}
                            >
                              <option value="">Select feedback</option>
                              <option value="Contains nudity">
                                Contains nudity
                              </option>
                              <option value="Violating privacy">
                                Violating privacy
                              </option>
                              <option value="Hate speech">Hate speech</option>
                              <option value="Spam">Spam</option>
                            </select>
                            <button
                              type="submit"
                              className="bg-red-500 text-white py-2 rounded disabled:bg-gray-500 px-5"
                              disabled={reportDisabled}
                            >
                              Report
                            </button>
                          </form>
                        </div>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto p-4">
        <div>
          <h3 className="text-black font-semibold text-lg">Comments</h3>
          <div className="">
            {comments
              .filter((comment) => comment.postID === id)
              .map((comment) => {
                const commentUser = users.find(
                  (user) => user.email === comment.email
                );
                return (
                  <div
                    key={comment._id}
                    className="border border-gray-300 p-2 my-2 rounded-md relative"
                  >
                    <div className="absolute top-4 right-3">
                      {user && user.email === comment.email && (
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                axiosPublic.delete(`/comments/${comment._id}`);
                                Swal.fire(
                                  "Deleted!",
                                  "Your comment has been deleted.",
                                  "success"
                                );
                                commentsRefetch();
                              }
                            });
                          }}
                        >
                          {" "}
                          <MdDelete className="text-red-500" />
                        </button>
                      )}
                      {user && user.email !== comment.email && (
                        //comment report button
                        <div>
                          <button
                            className="btn bg-white border-none py-0 px-0 hover:bg-white"
                            onClick={() => {
                                setCommentID(comment._id);
                              const res = commentReports.find((report) => {
                                console.log("[report]", report);
                                console.log("[comment]", comment);
                                console.log("[user]", user);

                                return (
                                  report.commentID === comment._id &&
                                  report.reporterEmail === user?.email
                                );
                              });
                              console.log(res);

                              if (user.length === 0) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Oops...",
                                  text: "You need to login to report!",
                                });
                                return;
                              }
                              if (res) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Oops...",
                                  text: "You have already reported this comment!",
                                });
                              } else {
                                setCommentReportModal("");
                                document
                                  .getElementById("my_modal_22")
                                  .showModal();
                              }
                            }}
                          >
                            <MdOutlineReportProblem className="text-red-400 text-lg" />
                          </button>
                          <dialog id="my_modal_22" className="modal">
                            <div
                              className={`modal-box bg-white ${commentReportModal}`}
                            >
                              <h3 className="font-bold text-lg text-black">
                                Report This Comment
                              </h3>
                              <hr />
                              <div className="mt-6 flex justify-center items-center">
                                <form
                                  onSubmit={handleReportComment}
                                  className="w-full flex justify-center items-center gap-2"
                                  method="dialog"
                                >
                                  <input
                                    type="hidden"
                                    name="commentID"
                                    value={commentID}
                                  />
                                  <select
                                    className="border border-gray-300 rounded p-2 bg-white focus:outline-red-200 text-gray-800"
                                    required
                                    name="feedback"
                                    onChange={(e) => {
                                      setCommentReportDisabled(
                                        e.target.value === ""
                                      );
                                    }}
                                  >
                                    <option value="">Select feedback</option>
                                    <option value="Contains nudity">
                                      Contains nudity
                                    </option>
                                    <option value="Violating privacy">
                                      Violating privacy
                                    </option>
                                    <option value="Hate speech">
                                      Hate speech
                                    </option>
                                    <option value="Spam">Spam</option>
                                  </select>
                                  <button
                                    type="submit"
                                    className="bg-red-500 text-white py-2 rounded disabled:bg-gray-500 px-5"
                                    disabled={commentReportDisabled}
                                  >
                                    Report
                                  </button>
                                </form>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src={commentUser?.photo}
                        alt={commentUser?.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm font-semibold text-black">
                        {commentUser?.name}
                      </span>
                    </div>
                    <p className="text-black">{comment.comment}</p>
                    <span className="text-gray-500 text-xs">
                      {timeSince(comment.date)}
                    </span>
                  </div>
                );
              })}
          </div>

          {user.length === 0 || (
            <form
              onSubmit={handleAddComment}
              className="mt-4 flex flex-col border border-gray-300 rounded-lg p-4 bg-white shadow-lg"
            >
              {user && (
                <div className="flex items-center mb-4">
                  <img
                    src={user?.photo}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </h4>
                    <p className="text-gray-600">
                      @{user.email?.split("@")[0]}
                    </p>
                  </div>
                </div>
              )}
              <textarea
                ref={commentTextareaRef}
                name="comment"
                className="w-full h-24 p-2 border border-gray-300 rounded-lg resize-none"
                placeholder="Add a comment"
              />
              <button
                className="mt-2 py-2 px-4 bg-customBlue text-white rounded-xl text-sm self-end"
                type="submit"
              >
                Post Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
