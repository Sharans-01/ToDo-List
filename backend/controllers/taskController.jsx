const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

// Create a task
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task' });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { title, description, isCompleted } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, isCompleted },
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task' });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task' });
    }
};
