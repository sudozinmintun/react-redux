// src/pages/HomePage.tsx
import React from 'react';
import PostList from '../features/posts/PostList';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Post App</h1>
            <PostList />
        </div>
    );
};

export default HomePage;
