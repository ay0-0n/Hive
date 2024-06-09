import { useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineHive} from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { TbPremiumRights } from "react-icons/tb";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <header className="w-full bg-white shadow-md shadow-gray-300">
      <nav className="container mx-auto">
        <section className="flex justify-between items-center">
          <div className="text-black flex flex-row justify-center items-center ml-2 md:ml-0 gap-1">
            <MdOutlineHive className="text-3xl pt-1 text" />
            <Link to="/">
              <span className="text-3xl font-medium text-black">h
              <span className=" text-black"></span>ive</span>
            </Link>
          </div>
          <div>
            <ul className="flex flex-row text-black gap-8 text-2xl">
              <li className="hover:bg-gray-100 text-gray-700 rounded-xl  flex justify-center items-center text-sm md:text-base">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-black border-b-4 border-black" : ""
                  }
                >
                  <div className="flex justify-center items-center gap-1 px-2 py-5">
                  <RiHomeLine /> <span className="">Home</span>
                  </div>
                </NavLink>
              </li>
              <li className="hover:bg-gray-100 text-gray-700 rounded-xl  flex justify-center items-center text-sm md:text-base">
                <NavLink
                  to="/membership"
                  className={({ isActive }) =>
                    isActive ? "text-black border-b-4 border-black" : ""
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
                <div className="dropdown">
                  <div tabIndex={0} role="button">
                    <IoIosNotifications className="text-2xl bg-black" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] right-0 p-2 top-6 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full">
                      <img alt="user" src={user.image} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">Profile</a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a onClick={logOut}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/join-us">
                <button className="text-xl px-4 py-1 border-blue-500  border-[1px] text-black bg-blue-200 hover:rounded-md hover:bg-blue-400">
                  Join us
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
