// src/features/posts/PostList.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, deletePost } from './postSlice';
import { Link } from 'react-router-dom';
import PostForm from "./PostForm";

const PostList: React.FC = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts.posts);
    const status = useAppSelector((state) => state.posts.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, status]);

    const handleDelete = (id: number) => {
        dispatch(deletePost(id));
    };

    return (
        <div>
            <h1>Post List</h1>

            <PostForm/>

            <Link to="/add">Add New Post</Link>
            {status === 'loading' && <p>Loading...</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <Link to={`/edit/${post.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
