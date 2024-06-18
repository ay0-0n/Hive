import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Pagination from './Pagination';

const PostList = ({ postToShow }) => {
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);

    const fetchPosts = async () => {
        let url = `/posts?page=${page}&limit=5`;
        if (postToShow.type === 'tag') {
            url = `/posts/tag/${postToShow.value}?page=${page}&limit=5`;
        } else if (postToShow.type === 'sort') {
            url = `/posts/sort/${postToShow.value}?page=${page}&limit=5`;
        }
        const res = await axiosPublic.get(url);
        return res.data;
    };

    const { data: posts, refetch } = useQuery(['posts', postToShow, page], fetchPosts, {
        keepPreviousData: true,
    });

    useEffect(() => {
        refetch();
    }, [postToShow, page]);

    return (
        <div className="p-4">
            {posts && posts.map(post => (
                <div key={post._id} className="border border-gray-300 p-4 mb-4">
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <p>Tags: {post.tag}</p>
                    <div>
                        <button>Upvote ({post.upVote})</button>
                        <button>Downvote ({post.downVote})</button>
                        <button>Comments ({post.commentCount})</button>
                    </div>
                </div>
            ))}
            <Pagination page={page} setPage={setPage} />
        </div>
    );
};

export default PostList;
