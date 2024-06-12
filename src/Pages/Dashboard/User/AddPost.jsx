import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAllPosts from "../../../hooks/useAllPosts";
import useAllTags from "../../../hooks/useAllTags";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Select from 'react-select';

const AddPost = () => {
  const [user] = useUser();
  const [posts, refetch] = useAllPosts();
  const [tags] = useAllTags();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const mutation = useMutation({
    mutationFn: (post) => {
      return axiosSecure.post("/posts", post);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Post added successfully",
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to add post",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedTag, setSelectedTag] = useState(null);
  const [userPostsCount, setUserPostsCount] = useState(posts?.filter((post) => post?.owner === user?.email).length);
  useEffect(() => {
    setUserPostsCount(posts?.filter((post) => post?.owner === user?.email).length);
  }, [posts, user?.email]);

  const onSubmit = async (data) => {
    if (userPostsCount >= 5 && !user?.membership) {
      Swal.fire({
        icon: "error",
        title: "Become a member to add more posts!",
      });
      return;
    }

    const newPost = {
      title: data.title,
      description: data.description,
      tag: selectedTag?.value,
      owner: user?.email,
      dateAdded: new Date().toISOString(),
      upVote: 0,
      downVote: 0,
      visibility: true,
    };

    mutation.mutate(newPost);
  };

  return (
    <div className="min-w-full">
      <div className="bg-cyan-900 w-full h-44 md:h-48 relative">
        <div className="text-center pt-5">
          <p className="text-3xl font-medium text-white">Create Post</p>
          <p className="text-xl text-gray-300">Share your thoughts with Hive</p>
        </div>
        <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto absolute left-1/2 transform -translate-x-1/2 top-24 md:top-28 border-2 border-gray-400 bg-white rounded-xl max-w-[70rem] shadow-lg p-4">
          {userPostsCount >= 5 && !user?.membership ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg text-center text-gray-700">
                You have reached the limit of free posts.
              </p>
              <AwesomeButton type="primary" onPress={() => navigate("/membership")} className="mt-4 w-full px-4 py-2 text-white bg-cyan-950" style={{
                  "--button-primary-color": "#083344D6",
                  "--button-primary-color-dark": "#3d8b95",
                  "--button-primary-color-hover": "#3d8b95" }}>Become a Member</AwesomeButton>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <img src={user?.photo} alt="User" className="w-10 h-10 rounded-full" />
                <span className="ml-2 text-lg font-semibold">{user?.name}</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <textarea
                  {...register("title", { required: "Title is required" })}
                  placeholder="What's on your mind?"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 focus:bg-gray-100"
                  rows="2"
                />
                {errors?.title && <p className="text-red-500">{errors.title.message}</p>}

                <textarea
                  {...register("description", { required: "Description is required" })}
                  placeholder="Add details"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 focus:bg-gray-100"
                />
                {errors?.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}

                <Select
                  value={selectedTag}
                  onChange={setSelectedTag}
                  options={tags.map(tag => ({ label: tag.name, value: tag.name }))}
                  className="text-gray-700 z-40"
                  placeholder="Select Tag"
                  required
                />
                {errors?.tag && <p className="text-red-500">Tag is required</p>}

                <AwesomeButton type="primary" className="w-full px-4 py-2 text-white bg-cyan-950" style={{
                  "--button-primary-color": "#083344D6",
                  "--button-primary-color-dark": "#3d8b95",
                  "--button-primary-color-hover": "#3d8b95" }}>Post</AwesomeButton>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
