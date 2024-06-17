import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaUserShield } from "react-icons/fa";
import useAllUsers from "../../../hooks/useAllUsers";
import { AwesomeButton } from "react-awesome-button";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [users, refetch] = useAllUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setSearchResults(users);
  }, [isSearching, users]);

  const mutation = useMutation({
    mutationFn: (email) => {
      return axiosSecure.delete(`/users/${email}`);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "User deleted successfully",
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to delete user",
      });
    },
  });

  const makeAdmin = useMutation({
    mutationFn: (email) => {
      return axiosSecure.patch(`/users/admin/${email}`, { role: "admin" });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "User made admin successfully",
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to make user admin",
      });
    },
  });

  const handleMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin.mutate(email);
      }
    });
  };

  const handleDelete = (user_email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(user_email);
      }
    });
  };

  const handleSearch = () => {
    setIsSearching(true);
    axiosPublic
      .get(`/users/search?username=${searchTerm}`)
      .then((response) => setSearchResults(response.data))
      .catch((error) => {
        console.error("Error searching users:", error);
        setIsSearching(false);
      });
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    setFilteredUsers(
      searchResults.filter((user) => {
        if (filter === "all") return true;
        if (filter === "users") return user.role === "user";
        if (filter === "admins") return user.role === "admin";
        if (filter === "members") return user.membership === true;
        if (filter === "nonMembers") return user.membership === false;
      })
    );
  }, [filter, searchResults]);

  const usersToDisplay = filteredUsers;

  return (
    <div className="min-w-full">
      <div className="bg-cyan-900 w-full h-56 md:h-52 relative">
        <div className="text-center pt-8">
          <p className="text-xl md:text-3xl  font-medium text-white">
            Manage Users
          </p>
          <p className="text-md md:text-xl text-gray-300">
            All users in one place
          </p>
        </div>
        <div className="w-[90%] md:w-[80%] xl:w-[60%] mx-auto absolute left-1/2 transform -translate-x-1/2 top-28 md:top-28 bg-white rounded-xl max-w-[70rem] shadow-lg p-4 border-2 border-gray-400">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center mb-3">
            <div className="flex justify-end mb-4">
              <label
                htmlFor="filter"
                className="bg-cyan-900 text-white px-4 rounded-l border-none hover:bg-customBlue flex justify-center items-center gap-1"
              >
                Filter:{" "}
              </label>
              <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                className="border rounded-r py-2 w-full bg-gray-100 focus:outline-customBlue"
              >
                <option value="all">All Users</option>
                <option value="users">Users</option>
                <option value="admins">Admins</option>
                <option value="members">Members</option>
                <option value="nonMembers">Non-Members</option>
              </select>
            </div>
            <div className="flex justify-end mb-4">
              <div className="relative">
                <input
                  type="text"
                  className="border rounded-l px-4 py-2 w-full bg-gray-100 focus:outline-customBlue"
                  placeholder="Search by username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm.length > 0 && (
                  <button
                    className="absolute right-0 top-0 bottom-0 rounded-r border-none flex justify-center items-center pr-3 text-red-600 text-xl"
                    onClick={() => {
                      setSearchTerm("");
                      setIsSearching(false);
                    }}
                  >
                    <IoMdClose />
                  </button>
                )}
              </div>
              <button
                className="bg-cyan-900 text-white px-4 rounded-r border-none hover:bg-customBlue flex justify-center items-center gap-1"
                onClick={handleSearch}
              >
                <IoIosSearch />
                Search
              </button>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="w-full overflow-x-auto">
              <thead className="tracking-wider">
                <tr className="text-left border-b-2 border-gray-300">
                  <th className="pr-3">Name</th>
                  <th className="pr-3">Email</th>
                  <th className="pr-3">Membership</th>
                  <th className="pr-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersToDisplay.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  usersToDisplay.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b-[1px] border-gray-300"
                    >
                      <td className="py-4 text-gray-900">{user.name}</td>
                      <td className="text-gray-900">{user.email}</td>
                      <td className="text-gray-900">
                        {user.membership ? "Member" : "Not a Member"}
                      </td>
                      <td>
                        <div className="flex flex-col md:flex-row justify-start items-center gap-2">
                          <AwesomeButton
                            onPress={() => handleMakeAdmin(user.email)}
                            type="primary"
                            style={{
                              "--button-primary-color": "#083344D6",
                              "--button-primary-color-dark": "#3d8b95",
                              "--button-primary-color-hover": "#3d8b95",
                            }}
                            disabled={user.role === "admin"}
                          >
                            <FaUserShield />
                          </AwesomeButton>
                          <AwesomeButton
                            onPress={() => handleDelete(user.email)}
                            type="danger"
                            disabled={user.role === "admin"}
                          >
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
    </div>
  );
};

export default ManageUsers;
