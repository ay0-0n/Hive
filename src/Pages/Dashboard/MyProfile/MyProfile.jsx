import { useState } from "react";
import { RiPoliceBadgeFill, RiEditFill } from "react-icons/ri";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAllUsers from "../../../hooks/useAllUsers";
import useAllPosts from "../../../hooks/useAllPosts";
import useAllComments from "../../../hooks/useAllComments";
import Swal from "sweetalert2";
import useMyRecentPosts from "../../../hooks/useMyRecentPosts";

const MyProfile = () => {
  const [isAdmin] = useAdmin();
  const [user] = useUser();
  const axiosSecure = useAxiosSecure();

  const [users] = useAllUsers();
  const [posts] = useAllPosts(); 
  const [comments] = useAllComments(); 
  const [myRecentPosts] = useMyRecentPosts(); 

  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");

  const handleEditAboutMe = () => {
    setIsEditingAboutMe(!isEditingAboutMe);
  };

  const handleSaveAboutMe = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/users/${user?.email}/aboutMe`, { aboutMe });
      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "About Me updated successfully",
        });
        setIsEditingAboutMe(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update About Me",
      });
    }
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    const newTag = e.target.tag.value;
    try {
      const res = await axiosSecure.post("/admin/tag", { email: user?.email, name: newTag, dateAdded: new Date().toISOString() });
      if (res?.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Tag added successfully",
        });
        e.target.reset();
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Tag already exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add tag",
        });
      }
    }
  };

  const timeSince = (date) => {
    const now = new Date();
    const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;
    if (secondsPast < 60) {
      return `${parseInt(secondsPast)} seconds ago`;
    }
    if (secondsPast < 3600) {
      return `${parseInt(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast <= 86400) {
      return `${parseInt(secondsPast / 3600)} hours ago`;
    }
    if (secondsPast > 86400) {
      const day = new Date(date).getDate();
      const month = new Date(date).toLocaleString("default", { month: "short" });
      const year = new Date(date).getFullYear() === now.getFullYear() ? "" : `, ${new Date(date).getFullYear()}`;
      return `${month} ${day}${year}`;
    }
  };

  const data = [
    { name: "Users", value: users?.length || 0 },
    { name: "Posts", value: posts?.length || 0 },
    { name: "Comments", value: comments?.length || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="min-w-full">
      <div className="bg-cyan-900 w-full h-36 md:h-44 relative">
        <div className="text-center pt-5">
          <p className="text-3xl font-medium text-white">Profile</p>
          <p className="text-xl text-gray-300">Welcome to Hive.</p>
        </div>
        <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto absolute left-1/2 transform -translate-x-1/2 top-24 md:top-28 border-2 border-gray-400 bg-white rounded-xl max-w-[70rem]">
          <div className="flex flex-col md:flex-row justify-around items-center p-10 gap-9">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-customBlue ring-offset-2">
                <img src={user?.photo} alt="User avatar" />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-semibold text-black">
                {user?.name}
              </p>
              <p className="text-base text-gray-600">{user?.email}</p>
              <p className="text-base text-gray-600">
                Joined on{" "}
                <span className="font-semibold">
                  {new Date(user?.registerDate)?.toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="bg-gray-200 w-28 text-center rounded-xl">
              <p className="text-xl py-4 text-stone-700">Badges</p>
              <div className="flex gap-2 justify-center items-center min-h-16">
                {user?.registerDate && (
                  <span className="text-amber-800 text-4xl">
                    <RiPoliceBadgeFill />
                  </span>
                )}
                {user?.membership && (
                  <span className="text-orange-400 text-4xl">
                    <RiPoliceBadgeFill />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[27rem] md:mt-40 w-[90%] md:w-[80%] xl:w-[60%] mx-auto max-w-[70rem]">
        <div className="flex justify-between items-center">
          <p className="text-xl md:text-2xl font-semibold text-black">About Me</p>
          <RiEditFill className="cursor-pointer text-2xl" onClick={handleEditAboutMe} />
        </div>
        {isEditingAboutMe ? (
          <form className="mt-4" onSubmit={handleSaveAboutMe}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              rows="3"
              placeholder="Write something about yourself"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              name="aboutMe"
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              type="submit"
            >
              Save
            </button>
          </form>
        ) : (
          <p className="mt-2 text-gray-600">
            {aboutMe || "Nothing to show"}
          </p>
        )}
      </div>

      {!isAdmin && (
        <div className="mt-12 w-[90%] md:w-[80%] xl:w-[60%] mx-auto max-w-[70rem]">
          <h2 className="text-xl md:text-2xl font-semibold text-black">My Recent Posts</h2>
          {myRecentPosts?.length > 0 ? (
            myRecentPosts.map((post, index) => (
              <div key={index} className="bg-white border border-gray-400 rounded-xl p-4 mt-4 shadow-md flex gap-4">
                <img src={user?.photo} alt="User" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="text-lg font-semibold text-black">{post?.title}</p>
                  <p className="text-sm text-black opacity-95">{post?.description}</p>
                  <div className="flex justify-between items-center mt-2 gap-6">
                    <span className="text-xs text-gray-700">Posted {timeSince(post?.dateAdded)}</span>
                    <span className="px-2 inline-block bg-gray-200 text-gray-700 rounded-full text-xs uppercase font-semibold">{post?.tag}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No recent posts to show</p>
          )}
        </div>
      )}

      {isAdmin && (
        <div className="mt-12 w-[90%] md:w-[80%] xl:w-[60%] mx-auto max-w-[70rem]">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">

  
            <div className="w-full md:w-[49%] border-2 rounded-xl border-gray-400 flex flex-col justify-between p-6 bg-white shadow-md h-80">
              <div className="flex flex-col text-left mb-4">
                <span className="text-3xl font-bold text-customBlue">{users?.length}</span>
                <span className="text-gray-600">Total Users</span>
              </div>
              <div className="flex flex-col text-left mb-4">
                <span className="text-3xl font-bold text-customBlue">{posts?.length}</span>
                <span className="text-gray-600">Total Posts</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-3xl font-bold text-customBlue">{comments?.length}</span>
                <span className="text-gray-600">Total Comments</span>
              </div>
            </div>
            



            <div className="w-full md:w-[48%] bg-white border-2 border-gray-400 h-80 rounded-xl shadow-md p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <form onSubmit={handleAddTag} className="mt-8 flex items-center gap-2 pb-12">
            <input
              type="text"
              name="tag"
              placeholder="Enter tag"
              required
              className="p-2 border border-gray-300 rounded-md flex-grow bg-white shadow-inner"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
            >
              Add Tag
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
