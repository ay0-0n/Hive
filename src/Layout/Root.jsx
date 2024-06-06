import { Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header";
import Footer from "../Pages/Shared/Footer";

const Root = () => {
    return (
        <div className="">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;