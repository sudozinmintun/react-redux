import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import todoReducer from '../features/todos/todoSlice';

export const store = configureStore({
    reducer: {
        posts: postReducer,
        todos: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
