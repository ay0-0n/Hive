import { IoIosNotifications } from "react-icons/io";
import { MdOutlineHive, MdWorkspacePremium } from "react-icons/md";
import { RiHome3Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const user = true;

  return (
    <header className="w-full bg-black py-3">
      <nav className="container mx-auto">
        <section className="flex justify-between items-center">
          <div className="text-white flex flex-row justify-center items-center ml-2 md:ml-0 gap-1">
            <MdOutlineHive className="text-2xl" />
            <Link to="/">
              <span className="text-2xl">hive</span>
            </Link>
          </div>
          <div>
            <ul className="flex flex-row text-gray-400 gap-8 text-2xl">
              <li className="hover:bg-gray-900 rounded-xl p-3">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "text-white" : "")}
                >
                  <RiHome3Fill />
                </NavLink>
              </li>
              <li className="hover:bg-gray-900 rounded-xl p-3">
                <NavLink
                  to="/membership"
                  className={({ isActive }) => (isActive ? "text-white" : "")}
                >
                  <MdWorkspacePremium />
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
                      <img
                        alt="user"
                        src={user.image}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/join-us">
                <button className="text-xl px-4 py-1 border-white rounded-md border-[1px] text-white">
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
