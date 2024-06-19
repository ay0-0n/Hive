import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { HomeContext } from "./Home";
import { HiSearch } from "react-icons/hi";
import banner from "../../assets/banner.webp";

const Banner = () => {
  const { axiosPublic, postSearch, postRefetch, setPostToShow, setSearching } =
    useContext(HomeContext);

  const { data: popularSearches = [], refetch: refetchPopularSearches } =
    useQuery({
      queryKey: ["popularSearches"],
      queryFn: async () => {
        const res = await axiosPublic.get("/searches/popular");
        return res.data;
      },
    });

  const search = async (tag) => {
    if (tag === "" || tag === null) {
      setSearching("");
      postRefetch();
      return;
    }

    setSearching(tag);

    postSearch.mutate(tag);

    const res = await axiosPublic.get(`/posts/tag/${tag}`);
    setPostToShow(res.data);

    refetchPopularSearches();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTag = e.target.elements.searchTag.value;
    search(searchTag);
  };

  return (
    <div className="border-b border-gray-300 p-4 pt-12" style={
        {backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
    }
    }>
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center w-[85%] lg:w-[70%] mx-auto"
      >
        <input
          type="text"
          name="searchTag"
          placeholder="Search By Tag"
          className="w-full input rounded-l-full border-[1px] border-customBlue focus:outline-none focus:border-customBlue-700 transition duration-300 bg-white"
        />
        <button
          type="submit"
          className="bg-customBlue border-2 border-customBlue rounded-r-full text-white px-5 py-2 text-xl hover:bg-customBlue-700 transition duration-300"
        >
          <span className="flex justify-center items-center">
            <HiSearch className="text-xl mr-1" />
            Search
          </span>
        </button>
      </form>
      <div className="mt-2 w-full flex justify-center items-center">
        <div className="rounded-full bg-customBlue bg-opacity-65">
        <span className="font-semibold text-black ml-4 mr-2">Popular Searches:</span>
        {popularSearches.length !== 0 ? (
          popularSearches.map((tag, index) => (
            <button
              key={index}
              className="btn btn-link text-black hover:text-customBlue-700 transition duration-300 hover:text-cyan-950 pl-0"
              onClick={() => {
                setSearching(tag);
                search(tag);
              }}
            >
              {tag}
            </button>
          ))
        ) : (
          <span className="text-gray-500">No search info.</span>
        )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
