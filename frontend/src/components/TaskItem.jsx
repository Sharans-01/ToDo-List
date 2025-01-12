import React, { useState } from 'react';
import axios from 'axios';  // Import axios for HTTP requests

const TaskItem = ({ task, fetchTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedDescription, setUpdatedDescription] = useState(task.description);

    const toggleComplete = async () => {
        await axios.put(`http://localhost:5000/tasks/${task._id}`, {
            isCompleted: !task.isCompleted,
        });
        fetchTasks();
    };

    const deleteTask = async () => {
        await axios.delete(`http://localhost:5000/tasks/${task._id}`);
        fetchTasks();
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setUpdatedTitle(task.title);
        setUpdatedDescription(task.description);
    };

    const updateTask = async () => {
        await axios.put(`http://localhost:5000/tasks/${task._id}`, {
            title: updatedTitle,
            description: updatedDescription,
            isCompleted: task.isCompleted,
        });
        setIsEditing(false);
        fetchTasks();
    };

    return (
        <div className="task-item">
            {/* Checkbox is conditionally rendered based on isEditing state */}
            {isEditing ? null : (
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={toggleComplete}
                />
            )}

            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        style={{ marginTop: '10px' }}
                    />
                    
                    <button id="save" onClick={updateTask}>Save</button>
                    <button id="cancel" onClick={cancelEditing}>Cancel</button>
                </div>
            ) : (
                <div>
                    <span className={task.isCompleted ? 'completed' : ''}>{task.title}</span>
                    <button id="edit" onClick={startEditing}>Edit</button>
                    <button id="delete" onClick={deleteTask}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
