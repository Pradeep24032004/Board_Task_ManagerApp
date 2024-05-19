
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../boards/Board.css'; // Import the CSS file for consistent styling

const Task = ({ boardId }) => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState('');
    const [editingTaskDescription, setEditingTaskDescription] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get(`https://task-manager-backend-11.onrender.com/boards/${boardId}/tasks`);
        setTasks(response.data);
    };

    const addTask = async () => {
        const response = await axios.post(`https://task-manager-backend-11.onrender.com/boards/${boardId}/tasks`, {
            title: taskTitle,
            description: taskDescription,
        });
        setTasks([...tasks, response.data]);
        setTaskTitle('');
        setTaskDescription('');
    };

    const updateTask = async () => {
        const response = await axios.put(`https://task-manager-backend-11.onrender.com/tasks/${editingTaskId}`, {
            title: editingTaskTitle,
            description: editingTaskDescription,
        });
        setTasks(tasks.map(task => (task._id === editingTaskId ? response.data : task)));
        setEditingTaskId(null);
        setEditingTaskTitle('');
        setEditingTaskDescription('');
    };

    const deleteTask = async (id) => {
        await axios.delete(`https://task-manager-backend-12.onrender.com/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div>
            <h2>Tasks</h2>
            <div className="task-input">
                <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="New Task Title" />
                <input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="New Task Description" />
                <button className="add" onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {editingTaskId === task._id ? (
                            <>
                                <div>
                                <div>
                                    <input 
                                        value={editingTaskTitle} 
                                        onChange={(e) => setEditingTaskTitle(e.target.value)} 
                                        placeholder="Edit Task Title"
                                    />
                                </div>
                                <div>
                                    <input 
                                        value={editingTaskDescription} 
                                        onChange={(e) => setEditingTaskDescription(e.target.value)} 
                                        placeholder="Edit Task Description"
                                    />
                                </div>
                                <div>
                                    <button className="edit" onClick={updateTask}>Update</button>
                                </div>
                            </div>
                                
                            </>
                        ) : (
                            <>
                                {task.title}: {task.description}
                                <button className="edit" onClick={() => {
                                    setEditingTaskId(task._id);
                                    setEditingTaskTitle(task.title);
                                    setEditingTaskDescription(task.description);
                                }}>Edit</button>
                                <button className="delete" onClick={() => deleteTask(task._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;

