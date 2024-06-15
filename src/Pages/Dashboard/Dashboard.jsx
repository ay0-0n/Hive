import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiHome, FiUsers, FiFileText, FiPlusCircle, FiList, FiBell } from "react-icons/fi";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const calculatedMinHeight = `calc(100vh - 3.5rem)`;

  return (
    <div className="relative flex w-full">
      <div
      className={`fixed bg-customBlue transition-all duration-300 ${
        expanded ? "w-56 lg:w-64 xl:w-96" : "w-16"
      }`}
      style={{ minHeight: calculatedMinHeight }}
    >
        <div className="h-full flex flex-col justify-between">
          <div className="pt-4 pl-2 space-y-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive && location.pathname === "/dashboard"
                  ? `flex items-center gap-3 p-2 pl-4 rounded-l-md text-white bg-cyan-800`
                  : "flex items-center gap-3 p-2 pl-3 rounded-l-md text-gray-200 hover:text-white hover:bg-cyan-700"
              }
            >
              <FiHome size={20} /> <span className={`${expanded ? 'block' : 'hidden'}`}>Profile</span>
            </NavLink>
            {isAdmin ? (
              <>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center gap-3 p-2 pl-4 rounded-l-md text-white bg-cyan-800`
                      : "flex items-center gap-3 p-2 pl-3 rounded-l-md text-gray-200 hover:text-white hover:bg-cyan-700"
                  }
                >
                  <FiUsers size={20} /> <span className={`${expanded ? 'block' : 'hidden'}`}>Manage Users</span>
                </NavLink>
                <NavLink
                  to="/dashboard/reports"
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center gap-3 p-2 pl-4 rounded-l-md text-white bg-cyan-800`
                      : "flex items-center gap-3 p-2 pl-3 rounded-l-md text-gray-200 hover:text-white hover:bg-cyan-700"
                  }
                >
                  <FiFileText size={20} /> <span className={`${expanded ? 'block' : 'hidden'}`}>Reports</span>
                </NavLink>
                <NavLink
                  to="/dashboard/make-announcement"
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center gap-3 p-2 pl-4 rounded-l-md text-white bg-cyan-800`
                      : "flex items-center gap-3 p-2 pl-3 rounded-l-md text-gray-200 hover:text-white hover:bg-cyan-700"
                  }
                >
                  <FiBell size={20} /> <span className={`${expanded ? 'block' : 'hidden'}`}>Announcement</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard/add-post"
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center gap-3 p-2 pl-4 rounded-l-md text-white bg-cyan-700`
                      : "flex items-center gap-3 p-2 pl-3 rounded-l-md text-gray-200 hover:text-white hover:bg-cyan-600"
                  }
                >
                  <FiPlusCircle size={20} /> <span className={`${expanded ? 'block' : 'hidden'}`}>Add Post</span>
                </NavLink>
                <NavLink
                  to="/dashboard/my-posts"
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center gap-3 p-2 pl-4 rounded-l-md text-white bg-cyan-800`
                      : "flex items-center gap-3 p-2 pl-3 rounded-l-md text-gray-200 hover:text-white hover:bg-cyan-700"
                  }
                >
                  <FiList size={20} /> <span className={`${expanded ? 'block' : 'hidden'}`}>My Posts</span>
                </NavLink>
              </>
            )}
          </div>
          <button
            className="flex items-center justify-center bg-cyan-800 hover:bg-cyan-900 hover:bg-opacity-90 transition-colors duration-300 absolute min-h-14 bottom-0 left-0 w-full text-white p-3"
            onClick={toggleSidebar}
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
      </div>
      <div
        className={`w-full min-h-[100vh] pb-16 transition-all duration-300 ${
          expanded ? "ml-56 lg:ml-64 xl:ml-96" : "ml-16"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
