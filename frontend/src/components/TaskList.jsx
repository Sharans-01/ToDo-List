import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Create a Task</h2>
            <TaskForm fetchTasks={fetchTasks} />
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
            ))}
        </div>
    );
};

export default TaskList;
