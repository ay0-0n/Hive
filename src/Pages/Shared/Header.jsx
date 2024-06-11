import { useContext, useState, useEffect } from "react";
import { AiTwotoneNotification } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { TbPremiumRights } from "react-icons/tb";
import { GiTreeBeehive } from "react-icons/gi";
import { IoLogOutSharp } from "react-icons/io5";

const dummyAnnouncements = [
  {
    title: "New Feature Release",
    authorName: "John Doe",
    authorPhoto: "https://lh3.googleusercontent.com/-JVpfmGGJuO8/AAAAAAAAAAI/AAAAAAAAAME/sMJVq9F8gec/photo.jpg",
    description: "We are excited to announce a new feature that will help you manage your tasks more efficiently.",
    date: new Date().toISOString(),
  },
  {
    title: "System Maintenance",
    authorName: "Jane Smith",
    authorPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHT4h_4rkeA-eC6mfEMK0xzEIyBsULL6G2KA&s",
    description: "Please be informed that there will be a system maintenance on Saturday, 10th June from 2 AM to 4 AM.",
    date: new Date().toISOString(),
  },
  {
    title: "System Maintenance",
    authorName: "Jane Smith",
    authorPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHT4h_4rkeA-eC6mfEMK0xzEIyBsULL6G2KA&s",
    description: "Please be informed that there will be a system maintenance on Saturday, 10th June from 2 AM to 4 AM.",
    date: new Date().toISOString(),
  },
  {
    title: "System Maintenance",
    authorName: "Jane Smith",
    authorPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHT4h_4rkeA-eC6mfEMK0xzEIyBsULL6G2KA&s",
    description: "Please be informed that there will be a system maintenance on Saturday, 10th June from 2 AM to 4 AM.",
    date: new Date().toISOString(),
  },
];

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Simulate fetching announcements
    setAnnouncements(dummyAnnouncements);
  }, []);

  return (
    <header className="w-full bg-white shadow-md shadow-gray-300">
      <nav className="container mx-auto">
        <section className="flex justify-between items-center">
          <div className="text-black flex flex-row justify-center items-center ml-2 md:ml-0 gap-1">
            <GiTreeBeehive className="text-customBlue text-3xl text" />
            <Link to="/">
              <span className="text-3xl font-medium text-black font-serif">
                hive
              </span>
            </Link>
          </div>
          <div>
            <ul className="flex flex-row text-black md:gap-8 text-2xl">
              <li className="hover:bg-gray-100 text-gray-700 rounded-xl flex justify-center items-center text-sm md:text-base">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-customBlue border-b-4 border-customBlue"
                      : ""
                  }
                >
                  <div className="justify-center items-center gap-1 px-2 py-5 hidden md:flex">
                    <RiHomeLine /> <span className="">Home</span>
                  </div>
                </NavLink>
              </li>
              <li className="hover:bg-gray-100 text-gray-700 rounded-xl flex justify-center items-center text-sm md:text-base">
                <NavLink
                  to="/membership"
                  className={({ isActive }) =>
                    isActive
                      ? "text-customBlue border-b-4 border-customBlue"
                      : ""
                  }
                >
                  <div className="flex justify-center items-center gap-1 px-2 py-5">
                    <TbPremiumRights /> <span className="">Membership</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="mr-2 md:mr-0">
            {user ? (
              <div className="flex justify-center items-center gap-2">
                <div className="dropdown dropdown-end pr-3">
                  <div
                    tabIndex={0}
                    role="button"
                    className="focus:border-b-2 py-2 focus:border-customBlue"
                  >
                    <div className="flex justify-center items-center mt-1">
                      <div className="indicator">
                        <span className="indicator-item badge badge-secondary bg-customBlue border-none text-white text-sm rounded-full font-normal">
                          {announcements.length}
                        </span>
                        <div className="grid text-2xl place-items-center">
                          <AiTwotoneNotification />
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content w-72 rounded-md bg-white border border-gray-300"
                  >
                    <li className="pointer-events-none">
                      <div className="text-lg font-semibold text-gray-700">Announcements</div>
                    </li>
                    <hr className="my-2" />
                    {announcements.length === 0 ? (
                      <li className="text-gray-800 pt-2 pl-2 pointer-events-none">No Announcements Yet.</li>
                    ) : (
                      <div className="h-64 overflow-y-scroll">
                        {announcements.map((announcement, index) => (
                        <li key={index} className="py-2 px-2 hover:bg-gray-100 rounded-md transition duration-200 pointer-events-none">
                          <div className="flex items-start gap-3">
                            <img
                              src={announcement.authorPhoto}
                              alt={announcement.authorName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-customBlue">{announcement.title}</h3>
                              <p className="text-xs text-gray-500">By {announcement.authorName} on {new Date(announcement.date).toLocaleDateString()}</p>
                              <p className="text-sm text-gray-700 mt-1">{announcement.description}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                      </div>
                    )}
                  </ul>
                </div>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full">
                      <img alt="user" src={user.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-2 mr-1 z-[1] p-2 shadow menu menu-sm dropdown-content w-56 rounded-md bg-white border border-gray-300"
                  >
                    <li className="pointer-events-none">
                      <div className="text-base text-black py-3">
                        <span className="text-customBlue text-base">Hi,</span>
                        {user.displayName}
                      </div>
                    </li>
                    <hr className="bg-gray-500 text-gray-500 h-[1.5px]" />
                    <Link to="/dashboard">
                      <li className="pt-2">
                        <div className="text-[0.9rem] text-gray-800">
                          <MdDashboard />
                          Dashboard
                        </div>
                      </li>
                    </Link>
                    <li className="pt-2 pb-1">
                      <button
                        onClick={logOut}
                        className="text-[0.9rem] text-gray-800"
                      >
                        <IoLogOutSharp />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/join-us">
                <button className="hover:before:bg-redborder-red-500 relative h-[45px] text-xl w-36 overflow-hidden border border-customBlue bg-white px-3 text-customBlue shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-customBlue before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10">Join us</span>
                </button>
              </Link>
            )}
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;