const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

// API Endpoints
app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const task = new Task({ title, description });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Server Listening
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
