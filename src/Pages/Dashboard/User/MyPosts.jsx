import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrash, FaComment, FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AwesomeButton } from "react-awesome-button";
import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5";
import useAllVotes from "../../../hooks/useAllVotes";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import { Helmet } from "react-helmet-async";

const MyPosts = () => {
  const axiosPublic = useAxiosPublic();
  const [user] = useUser();
  const [votes] = useAllVotes();
  
  const {data: myPosts , refetch: myPostRefetch} = useQuery({
    queryKey: [`MyPosts${user?.email}`],
    queryFn: async () => {
      console.log('user:',user)
      const res = await axiosPublic.get(`/posts/mypost/${user.email}`);
      return res.data;
    }
  })

  const handleDelete = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/post/${postId}`)
          .then(() => {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            myPostRefetch();
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong", "error");
          });
      }
    });
  };

  const handleVisibility = (postId, visibility) => {
    axiosPublic
      .patch(`/post/visibility/${postId}`, { visibility })
      .then((response) => {
        if (response.status === 200) {
          myPostRefetch();
          Swal.fire("Success!", "Visibility updated", "success");
        } else {
          Swal.fire("Failed!", "Failed to update visibility", "error");
        }
      })
      .catch((error) => {
        console.error('Error updating visibility:', error);
        Swal.fire("Error!", "Something went wrong", "error");
      });
  };

  const getTimeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
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

  return (
    <div className="min-w-full">
      <Helmet>
        <title>Hive - My Posts</title>
      </Helmet>
      <div className="bg-cyan-900 w-full h-56 md:h-52 relative">
        <div className="text-center pt-8">
          <p className="text-xl md:text-3xl font-medium text-white">My Posts</p>
          <p className="text-md md:text-xl text-gray-300">All your posts in one place</p>
        </div>
        <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto absolute left-1/2 transform -translate-x-1/2 top-24 md:top-28 bg-white rounded-xl max-w-[70rem] shadow-lg p-4 border-2 border-gray-400">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b-2 border-gray-300">
                <th>Title</th>
                <th className="hidden md:table-caption">Created</th>
                <th className="hidden md:table-cell">Tag</th>
                <th>Votes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    You have no posts yet.
                  </td>
                </tr>
              ) : (
                myPosts?.map((post) => (
                  <tr key={post._id} className="border-b-[1px] border-gray-300">
                    <td className="py-8 text-gray-900 overflow-x-clip max-w-32">{post.title}</td>
                    <td className="text-gray-900 hidden md:table-cell">{getTimeSince(post.dateAdded)}</td>
                    <td className="text-gray-900 hidden md:table-cell">{post.tag}</td>
                    <td>
                      <div className="flex flex-col md:flex-row justify-start items-center">
                        <div className="text-gray-900 flex flex-col justify-center items-center">
                          <IoArrowUpCircle className="text-3xl text-cyan-950" /> {votes.filter(vote => vote.postId === post._id && vote.voteType === 'up').length}
                        </div>
                        <div className="text-gray-900 flex flex-col justify-center items-center">
                          <IoArrowDownCircle className="text-3xl text-cyan-950" /> {votes.filter(vote => vote.postId === post._id && vote.voteType === 'down').length}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col md:flex-row justify-start items-center gap-2">
                        <Link to={`/post/${post._id}`}>
                          <AwesomeButton
                            type="primary"
                            className=""
                            style={{
                              "--button-primary-color": "#083344D6",
                              "--button-primary-color-dark": "#3d8b95",
                              "--button-primary-color-hover": "#3d8b95",
                            }}
                          >
                            <FaComment />
                          </AwesomeButton>
                        </Link>
                        <AwesomeButton onPress={() => handleVisibility(post._id, post.visibility)} type="primary">
                          {post.visibility ? <FaEye /> : <FaEyeSlash />}
                        </AwesomeButton>
                        <AwesomeButton onPress={() => handleDelete(post._id)} type="danger">
                          <FaTrash />
                        </AwesomeButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
