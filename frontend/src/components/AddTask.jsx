// AddTask.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', { title, description });
            setTitle('');
            setDescription('');
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error adding task:', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
