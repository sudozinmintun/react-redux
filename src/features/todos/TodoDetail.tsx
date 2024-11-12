import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTodo, setStatusIdle } from './todoSlice';

const TodoDetail = () => {
    const { todoId } = useParams<{ todoId?: string }>();
    const dispatch = useAppDispatch();

    const status = useAppSelector((state) => state.todos.status);
    const error = useAppSelector((state) => state.todos.error);
    const selectedTodo = useAppSelector((state) => state.todos.selectedTodo);

    useEffect(() => {
        if (todoId) {
            dispatch(setStatusIdle());  // Reset status to trigger refetch
        }
    }, [todoId, dispatch]);

    useEffect(() => {
        if (status === 'idle' && todoId) {
            dispatch(fetchTodo(Number(todoId)));
        }
    }, [dispatch, status, todoId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!selectedTodo) {
        return <div>Todo not found.</div>;
    }

    return (
        <div>
            <h2>Todo Details</h2>
            <p><strong>ID:</strong> {selectedTodo.id}</p>
            <p><strong>Title:</strong> {selectedTodo.title}</p>
            <p><strong>Completed:</strong> {selectedTodo.completed ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default TodoDetail;
