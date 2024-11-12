import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types
interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state
const initialState: PostState = {
    posts: [],
    status: 'idle',
    error: null,
};

// Thunks for CRUD operations
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (post: Post) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post: Post) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return postId;
});

// Slice
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load posts';
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload);
            });
    },
});

export default postSlice.reducer;
