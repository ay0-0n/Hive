import useAllTags from "../../hooks/useAllTags";
import useAllComments from "../../hooks/useAllComments";
import useUser from "../../hooks/useUser";
import { createContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAnnouncements from "../../hooks/useAnnouncements";
import Banner from "./Banner";
import Drawer from "./Drawer";
import { RxHamburgerMenu } from "react-icons/rx";

export const HomeContext = createContext(null);

const Home = () => {
  const [tags] = useAllTags();
  const [comments] = useAllComments();
  const [user] = useUser();
  const axiosPublic = useAxiosPublic();
  const [postToShow, setPostToShow] = useState();
  const [announcements] = useAnnouncements();

  const { refetch: postRefetch } = useQuery({
    queryKey: ["VisiblePosts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts/visible");
      setPostToShow(res.data);
      return res.data;
    },
  });

  const postSearch = useMutation({
    mutationFn: async (searchTag) => {
      const res = await axiosPublic.post("/posts/search", {
        user: user?.email,
        searchTag,
        date: new Date().toISOString(),
      });
      return res.data;
    },
  });
  console.log(postToShow);

  return (
    <HomeContext.Provider
      value={{
        axiosPublic,
        postRefetch,
        tags,
        announcements,
        comments,
        user,
        postSearch,
        postToShow,
        setPostToShow,
      }}
    >
      <section className="hidden lg:block container mx-auto">
        <div className="flex justify-between">
            <div className="w-[25%] min-h-[93vh] bg-white border-r border-black sticky left-0 top-9">
                <Drawer />
            </div>
            <div className="w-[75%] h-[300rem] bg-red-200">
                <Banner />
                PAGES
            </div>

        </div>
      </section>

      <section className="lg:hidden container mx-auto">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-[300rem]">
          <Banner />
          <label htmlFor="my-drawer" className="text-black text-xl drawer-button fixed top-[23px] smx:left-2 z-[60]">
          <RxHamburgerMenu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-60 sm:w-72 min-h-full bg-base-200 text-base-content">
            <Drawer/>
          </ul>
        </div>
      </div>
      </section>
    </HomeContext.Provider>
  );
};

export default Home;
