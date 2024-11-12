// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditPostPage from './pages/EditPostPage';
import TodoList from "./features/todos/TodoList";
import TodoDetail from "./features/todos/TodoDetail";

class Nav extends React.Component {
    render() {
        return <nav>
            <Link to="/">Posts</Link>
            <Link to="/todos">Todos</Link>
        </nav>;
    }
}

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Nav/>

                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/add" element={<EditPostPage/>}/>
                    <Route path="/edit/:postId" element={<EditPostPage/>}/>
                    <Route path="/todos" element={<TodoList/>}/>
                    <Route path="/todo/detail/:todoId" element={<TodoDetail/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
