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
import { FaLock, FaGlobe } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';

const visibilityOptions = [
  { name: "Public", value: true, icon: <FaGlobe className="mr-2" /> },
  { name: "Private", value: false, icon: <FaLock className="mr-2" /> },
];
const tagIcon = <span className="text-xl mr-2"><FaTags /></span>;

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
      reset();
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
    reset,
  } = useForm();

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedVisibility, setSelectedVisibility] = useState(null);
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
      visibility: selectedVisibility.value.value,
    };

    mutation.mutate(newPost);
  };

  return (
    <div className="min-w-full">
      <div className="bg-cyan-900 w-full h-56 md:h-52 relative">
        <div className="text-center pt-8">
          <p className="text-xl md:text-3xl font-medium text-white">Create Post</p>
          <p className="text-md md:text-xl text-gray-300">Share your thoughts with Hive</p>
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
                <div className="w-12 h-12 rounded-full border-customBlue border-2 flex justify-center items-center">
                  <img src={user?.photo} alt="User" className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="ml-2 text-lg font-semibold leading-4">{user?.name}</span>
                  <span className="ml-2 text-sm font-semibol text-black text-opacity-50">@{user?.email.split('@')[0]}</span>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <textarea
                  {...register("title", { required: "Title is required" })}
                  placeholder="Add a title"
                  className="w-full p-2 border-customBlue border-b-2 focus:text-black focus:outline-none placeholder:text-black placeholder:text-opacity-50 bg-white"
                  rows="1"
                />
                {errors?.title && <p className="text-red-500">{errors.title.message}</p>}

                <textarea
                  {...register("description", { required: "Description is required" })}
                  placeholder="Whats on your mind?"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-customBlue focus:outline-1 text-black placeholder:text-black placeholder:text-opacity-50"
                />
                {errors?.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}

                <div className='flex justify-between'>
                  <div className="w-[48%]">
                    <Select
                      value={selectedVisibility}
                      onChange={setSelectedVisibility}
                      options={visibilityOptions.map(option => ({
                        label: <div className="flex items-center">{option.icon}{option.name}</div>,
                        value: option 
                      }))}
                      className="text-gray-700 z-40 focus:outline-none focus:border-transparent"
                      placeholder='Select Visibility'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? '#3D8B95' : '#3D8B95',
                        }),
                      }}
                      required
                    />
                    {errors?.visibility && <p className="text-red-500">Visibility is required</p>}
                  </div>

                  <div className="w-[48%]">
                    <Select
                      value={selectedTag}
                      onChange={setSelectedTag}
                      options={tags.map(tag => ({ 
                        label: <div className="flex items-center">{tagIcon}{tag.name}</div>,
                         value: tag.name }))}
                      className="text-gray-700 z-40 focus:outline-none focus:border-transparent"
                      placeholder="Select Tag"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? '#3D8B95' : '#3D8B95',
                        }),
                      }}
                    />
                    {errors?.tag && <p className="text-red-500">Tag is required</p>}
                  </div>
                </div>

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
