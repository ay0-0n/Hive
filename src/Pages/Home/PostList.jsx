import { useContext, useState, useEffect } from 'react';
import { HomeContext } from './Home';
import useAllUsers from '../../hooks/useAllUsers';
import { FaThumbsUp, FaThumbsDown, FaComments } from 'react-icons/fa';
import { MdManageSearch } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../auth/AuthProvider';
import Swal from 'sweetalert2';
import useAllVotes from '../../hooks/useAllVotes';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const PostList = () => {
    const { 
        postRefetch,
        comments,
        user,
        axiosPublic,
        postToShow,
        searching, 
        setSearching 
    } = useContext(HomeContext);

    const [votes, votesRefetch] = useAllVotes();
    const {data: myVotes = [], refetch:myVotesRefetch} = useQuery({
        queryKey: ['MyVotes', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/votes/${user?.email}`);
            return res.data;
        },
    });

    const [users] = useAllUsers();
    const {user:currentUser} = useContext(AuthContext);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postToShow?.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(postToShow?.length / postsPerPage);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when postToShow changes
    }, [postToShow]);

    const handleVote = async (postId, voteType) => {
        if (!currentUser) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to login to vote!',
            });
            return;
        }

        const vote = myVotes.find(vote => vote.postId === postId);
        if (!vote) {
            await axiosPublic.post('/votes', {
                user: currentUser.email,
                postId,
                voteType,
                date: new Date().toISOString(),
            });
            myVotesRefetch();
            votesRefetch();
        }
        else if (vote.voteType === voteType) {
            await axiosPublic.delete(`/votes/${vote._id}`);
            myVotesRefetch();
            votesRefetch();
        }
        else if (vote.voteType !== voteType) {
            await axiosPublic.patch(`/votes/${vote._id}`, {
                voteType,
                date: new Date().toISOString(),
            });
            myVotesRefetch();
            votesRefetch();
        }
    };

    const timeSince = (date) => {
        const now = new Date();
        const seconds = Math.floor((now - new Date(date)) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <>
            <h1 className=" font-semibold pl-4 mt-6 text-3xl text-black">Posts</h1>
            {searching && <h2 className="text-lg mb-4 pl-4 text-gray-600 flex justify-start items-center gap-1">
            <MdManageSearch />Showing Results for: <span className='text-black font-semibold'>
            {searching}</span><span className=' cursor-pointer' onClick={
                () => {
                    setSearching('');
                    postRefetch();
                }
            }><RxCross2 className='text-red-500'/></span></h2>}
            <hr className='border-customBlue border-[1px] ml-4 mt-2 w-56'/>
            <div className="p-4 lg:pr-0 min-h-[120vh]">
                {currentPosts && currentPosts.map(post => {
                    const owner = users.find(user => user.email === post.owner);
                    return (
                        <div key={post._id} className="border border-gray-300 px-4 pb-4 mb-4 rounded-lg shadow-lg">
                            <Link to={`/post/${post._id}`}>
                            {owner && (
                                <div className="flex justify-start items-center">
                                    <img src={owner.photo} alt={owner.name} className="w-8 h-8 rounded-full mr-4" />
                                    <div className='flex flex-col justify-start items-start pt-4'>
                                    <div className='flex justify-center items-center gap-2'>
                                        <h2 className="text-base font-bold text-black text-opacity-80">{owner.name}</h2>
                                        <p className="text-sm text-gray-600">@{owner.email.split('@')[0]}</p>
                                    </div>
                                    <p className="text-[12px] text-gray-500 mb-4">Posted {timeSince(post.dateAdded)}</p>
                                    </div>
                                </div>
                            )}
                            <h3 className="text-xl font-semibold mb-1 text-black">{post.title}</h3>
                            <p className="text-black mb-6 text-opacity-75">{post.description}</p>
                            </Link>

                            <hr />
                            <div className="flex py-3 justify-between">
                                <div className='flex flex-row justify-start items-center gap-6'>
                                <button className={`flex justify-center items-center text-gray-500 ${myVotes.find(vote => vote.postId === post._id)?.voteType === 'up' ? 'text-blue-500' : ''}`}  onClick={() => handleVote(post._id, "up")}>
                                    <FaThumbsUp className="mr-1" /> {votes.filter(vote => vote.postId === post._id && vote.voteType === 'up').length}
                                </button>
                                <button className={`flex justify-center items-center text-gray-500 ${myVotes.find(vote => vote.postId === post._id)?.voteType === 'down' ? 'text-red-500' : ''}`} onClick={() => handleVote(post._id, "down")}>
                                    <FaThumbsDown className="mr-1" /> {votes.filter(vote => vote.postId === post._id && vote.voteType === 'down').length}
                                </button>
                                <Link to={`/post/${post._id}`} className="flex justify-center items-center text-gray-500">
                                <button className="flex justify-center items-center text-gray-500">
                                    <FaComments className="mr-1" /> {comments.filter(comment => comment.postID === post._id).length}
                                </button>
                                </Link>
                                </div>
                                <p className="text-black font-bold text-opacity-50 px-2 rounded-xl">#{post.tag}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </>
    );
};

export default PostList;
