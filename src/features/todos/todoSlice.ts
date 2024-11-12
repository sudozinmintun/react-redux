import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
    "userId?": number,
    "id": number,
    "title": string,
    "completed": boolean
}

interface TodoState {
    todos: Todo[];

    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedTodo: Todo | null,
}

const initialState: TodoState = {
    todos: [],
    status: 'idle',
    error: null,
    selectedTodo: null,
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

export const fetchTodo = createAsyncThunk('todos/fetchTodo', async (todoId: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${todoId}`);
    return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${todoId}`);
    return todoId;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setStatusIdle: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load todos';
            })
            .addCase(fetchTodo.pending, (state) => {
                state.status = 'loading';
                state.selectedTodo = null;
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedTodo = action.payload;
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch todo';
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });
    },
});

export const { setStatusIdle } = todoSlice.actions;
export default todoSlice.reducer;
