import { useContext } from "react";
import { HomeContext } from "./Home";
import { PiTrendUpBold } from "react-icons/pi";
import { BiCommentDetail } from "react-icons/bi";
import { TiTags } from "react-icons/ti";
import { TfiAnnouncement } from "react-icons/tfi";

const Drawer = () => {
  const {
    axiosPublic,
    tags,
    announcements,
    setPostToShow,
    setSearching
  } = useContext(HomeContext);

  const sortedAnnouncements = announcements?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleTagClick = async (tag) => {
    setSearching(tag)
    const res = await axiosPublic.get(`/posts/${tag}`);
    setPostToShow(res.data);
  }

  const handleSort = async (type) => {
    setSearching(type=== "popularity" ? "Popular Posts" : "Most Commented Posts")
    const res = await axiosPublic.get(`/posts/sort/${type}`);
    setPostToShow(res.data);
  }

  return (
    <div className="p-3 pt-16 lg:pt-6">
      <div className="collapse collapse-arrow bg-base-200 lg:bg-white">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-black opacity-70">Sort By</div>
        <div className="collapse-content">
          <div className="flex flex-col justify-center items-start space-y-4">
            <button className="flex justify-center items-center gap-2 text-black" 
            onClick={()=>handleSort("popularity")}>
              <PiTrendUpBold />
              Popularity
            </button>
            <button className="flex justify-center items-center gap-2 text-black"
            onClick={()=>handleSort("comments")}>
              <BiCommentDetail />
              Comments
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-2 border-[0.5px] border-black" />
      <div className="collapse collapse-arrow bg-base-200 lg:bg-white">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-black opacity-70">Tags</div>
        <div className="collapse-content">
          <div className="flex flex-col justify-center items-start  space-y-4">
            {tags &&
              tags.map((tag) => (
                <button
                  key={tag._id}
                  className="flex justify-center items-center gap-2 text-black" onClick={() => {handleTagClick(tag.name)}}
                >
                  <TiTags />
                  {tag.name}
                </button>
              ))}
          </div>
        </div>
      </div>
      <hr className="mt-2 border-[0.5px] border-black" />
      {announcements && (
        <div className="collapse collapse-arrow bg-base-200 lg:bg-white">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-black opacity-70">Announcemnets</div>
          <div className="collapse-content">
            <div className="flex flex-col justify-center items-start  space-y-4">
              {sortedAnnouncements.map((announcement) => (
                <div key={announcement._id}>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="row-span-2"><TfiAnnouncement className="pt-1 text-black"/></div>
                    <div className="col-span-5">
                        <h3 className="text-black">{announcement.title}</h3>
                        <h4 className="text-black text-opacity-65 text-sm mt-2">Posted by {announcement.authorName} on  
                            {` ${ new Date(announcement.date).getDay()}/${new Date(announcement.date).getMonth()}/${new Date(announcement.date).getFullYear()}`}
                        </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drawer;
