import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { AiFillDelete } from "react-icons/ai";
import { formatDistanceToNow } from 'date-fns';
import useAnnouncements from "../../../hooks/useAnnouncements";

const Announcement = () => {
  const [user] = useUser();
  const axiosSecure = useAxiosSecure();
  const [ announcemnetRefetch] = useAnnouncements();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const mutation = useMutation({
    mutationFn: (announcement) => {
      return axiosSecure.post("/announcement", announcement);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Announcement added successfully",
      });
      refetch();
      announcemnetRefetch();
      reset(); // Reset the form after successful submission
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to add Announcement",
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id) => {
      return axiosSecure.delete(`/announcement/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Announcement deleted successfully",
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to delete Announcement",
      });
    },
  });

  const deleteAnnouncement = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      mutationDelete.mutate(id);
    }
  };

  const onSubmit = async (data) => {
    const newAnnouncement = {
      title: data.title,
      authorName: user?.name,
      authorPhoto: user?.photo,
      authorEmail: user?.email,
      description: data.description,
      date: new Date().toISOString(),
    };

    mutation.mutate(newAnnouncement);
  };

  const { data: announcements = [], refetch } = useQuery({
    queryKey: [`${user?.email}-announcement`],
    queryFn: () => axiosSecure.get(`/announcements/${user.email}`).then(res => res.data),
  });

  return (
    <div className="min-w-full">
      <div className="bg-cyan-900 w-full h-44 md:h-48 relative">
        <div className="text-center pt-5">
          <p className="text-3xl font-medium text-white">Create Announcement</p>
          <p className="text-xl text-gray-300">Share your updates with the community</p>
        </div>
        <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto absolute left-1/2 transform -translate-x-1/2 top-24 md:top-28 border-2 border-gray-400 bg-white rounded-xl max-w-[70rem] shadow-lg p-4">
          <div className="flex items-center mb-4">
            <img src={user?.photo} alt="User" className="w-10 h-10 rounded-full" />
            <span className="ml-2 text-lg font-semibold">{user?.name}</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
              {...register("title", { required: "Title is required" })}
              placeholder="Announcement title"
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

            <AwesomeButton type="primary" className="w-full px-4 py-2 text-white bg-cyan-950" style={{
              "--button-primary-color": "#083344D6",
              "--button-primary-color-dark": "#3d8b95",
              "--button-primary-color-hover": "#3d8b95" }}>Post</AwesomeButton>
          </form>
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto mt-96">
        <h2 className="text-2xl font-semibold mb-4 text-black">My Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-gray-700">No announcements yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="relative p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="absolute top-2 right-2">
                  <AiFillDelete
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteAnnouncement(announcement._id)}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{announcement.description}</p>
                <div className="flex items-center">
                  <img src={announcement.authorPhoto} alt="Author" className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <p className="text-sm font-semibold">{announcement.authorName}</p>
                    <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(announcement.date))} ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
