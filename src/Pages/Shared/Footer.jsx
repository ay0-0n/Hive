import { GiTreeBeehive } from "react-icons/gi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-cyan-900">
      <div className="container mx-auto">
        <footer className="footer py-12 bg-cyan-900 text-base-content">
          <aside>
            <Link to="/">
              <div className="text-white flex flex-row justify-center items-center ml-9 lg:ml-2 gap-1">
                <GiTreeBeehive className="text-customBlue text-3xl text" />
                <span className="text-3xl font-medium text-white font-serif">
                  hive
                </span>
              </div>
            </Link>
          </aside>
          <nav className="ml-8">
            <h6 className="footer-title text-white">Company</h6>
            <a className="link link-hover text-white">About us</a>
            <a className="link link-hover text-white">Donations</a>
          </nav>
          <nav className="ml-8">
            <h6 className="footer-title text-white">Reach Out</h6>
            <a className="link link-hover text-white">Contact</a>
            <a className="link link-hover text-white">Jobs</a>
          </nav>
          <nav className="ml-8">
            <h6 className="footer-title text-white">Legal</h6>
            <a className="link link-hover text-white">Terms of use</a>
            <a className="link link-hover text-white">Privacy policy</a>
          </nav>
        </footer>
        <div className="w-full flex justify-center items-center py-2 border-t-[1px] border-gray-600">
            <p className="text-white text-center text-sm text-opacity-55">
                &copy; 2024 ayo_on. All rights reserved.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
