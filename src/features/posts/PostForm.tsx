import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addPost, updatePost } from './postSlice';

const PostForm: React.FC = () => {
    const { postId } = useParams<{ postId?: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const post = useAppSelector((state) =>
        state.posts.posts.find((post) => post.id === Number(postId))
    );

    const [title, setTitle] = useState(post?.title || '');
    const [body, setBody] = useState(post?.body || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost = { id: postId ? Number(postId) : 0, title, body };
        if (postId) {
            dispatch(updatePost(newPost)).then(() => navigate('/'));
        } else {
            dispatch(addPost(newPost)).then(() => navigate('/'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{postId ? 'Edit Post' : 'Add Post'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            ></textarea>
            <button type="submit">{postId ? 'Update Post' : 'Create Post'}</button>
        </form>
    );
};

export default PostForm;
