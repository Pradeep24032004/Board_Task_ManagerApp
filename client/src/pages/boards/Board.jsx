
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Task from '../tasks/Task';
import './Board.css';

const Board = () => {
    const [boards, setBoards] = useState([]);
    const [boardName, setBoardName] = useState('');
    const [editingBoardId, setEditingBoardId] = useState(null);
    const [editingBoardName, setEditingBoardName] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchBoards();
        fetchUserDetails();
    }, []);

    const fetchBoards = async () => {
        const response = await axios.get('https://task-manager-backend-12.onrender.com/boards');
        setBoards(response.data);
    };

    const addBoard = async () => {
        const response = await axios.post('https://task-manager-backend-12.onrender.com/boards', { name: boardName });
        setBoards([...boards, response.data]);
        setBoardName('');
    };

    const updateBoard = async () => {
        const response = await axios.put(`https://task-manager-backend-12.onrender.com/boards/${editingBoardId}`, { name: editingBoardName });
        setBoards(boards.map(board => (board._id === editingBoardId ? response.data : board)));
        setEditingBoardId(null);
        setEditingBoardName('');
    };

    const deleteBoard = async (id) => {
        await axios.delete(`https://task-manager-backend-12.onrender.com/boards/${id}`);
        fetchBoards();
    };

    const fetchUserDetails = async () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            try {
                const response = await axios.get(`https://task-manager-backend-12.onrender.com/user?email=${userEmail}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate("/signin");
        //window.location.reload(); // Reload the page to clear user data
    };

    return (
        <div className="container">
            <h1>Board</h1><br/><br/>
            <div className="header">
                <br/><br/>
                {user && (
                    <div className="profile"><br/>
                        <p>Welcome, {user.name}</p>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div><br/><br/>
            <div><br/><br/><br/>
                <input value={boardName} onChange={(e) => setBoardName(e.target.value)} placeholder="New Board" />
                <button className="add" onClick={addBoard}>Add Board</button>
            </div>
            <div className="board-container">
                {boards.map(board => (
                    <div key={board._id} className="board">
                        {editingBoardId === board._id ? (
                            <>
                                <input value={editingBoardName} onChange={(e) => setEditingBoardName(e.target.value)} />
                                <button className="edit" onClick={updateBoard}>Update</button><br/>
                            </>
                        ) : (
                            <>
                                <h2>{board.name}</h2>
                                <button className="edit" onClick={() => {
                                    setEditingBoardId(board._id);
                                    setEditingBoardName(board.name);
                                }}>Edit</button><br/>
                                <button className="delete" onClick={() => deleteBoard(board._id)}>Delete</button>
                            </>
                        )}
                        <Task boardId={board._id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;

