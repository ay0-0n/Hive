import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HomeContext } from './Home';

const Banner = () => {
    const { axiosPublic, postSearch,postRefetch, setPostToShow } = useContext(HomeContext);
    const [searching, setSearching] = useState('');

    const {data:popularSearches=[], refetch:refetchPopularSearches} = useQuery({
        queryKey: ['popularSearches',],
        queryFn: async () => {
            const res = await axiosPublic.get("/searches/popular");
            return res.data;
        },
    });

    const search = async(tag) => {
        if (tag === '' || tag === null){
            setSearching('');
            postRefetch();
            return;
        }

        setSearching(tag);

        postSearch.mutate(tag);

        const res = await axiosPublic.get(`/posts/tag/${tag}`);
        setPostToShow(res.data);

        refetchPopularSearches();
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTag = e.target.elements.searchTag.value;
        search(searchTag);
    };

    return (
        <div className="bg-white border-b border-gray-300 p-4">
            <form onSubmit={handleSearch}>
                <input type="text" name="searchTag" placeholder="Search..." className="input input-bordered w-full" />
                <button type="submit" className="btn btn-primary ml-2">Search</button>
            </form>
            <div className="mt-2">
                <span>Popular Searches: </span>
                {popularSearches.length !== 0 ? popularSearches.map((tag, index) => (
                    <button key={index} className="btn btn-link" onClick={()=> {
                        setSearching(tag);
                        search(tag)}}
                    >{tag}</button>
                )) : <span>No search info.</span>}
            </div>
            {searching !== '' && 
            <div className="mt-2">
            Searching By: <span>{searching}</span>
        </div>   
            }
        </div>
    );
};

export default Banner;
