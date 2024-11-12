import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTodos, deleteTodo} from "./todoSlice";
import {Link} from "react-router-dom";

const TodoList = () => {

    const dispatch = useAppDispatch();
    const todos = useAppSelector((state => state.todos.todos))
    const status = useAppSelector((state) => state.todos.status);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
    }, [dispatch, status]);

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id));
    }

    return (
        <div>
            <h1>Todo</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <h2>{todo.title}</h2>
                        <button onClick={() => handleDelete(todo.id)}>
                            Delete
                        </button>

                        <Link to={`/todo/detail/${todo.id}`}>Detail</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;