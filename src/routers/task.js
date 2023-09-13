import express from 'express';
import router from 'router';
import Task from ('../models/task.js');
import auth from ('../models/auth.js');

// CREATE a task

router.post('/tasks', auth, async( req, res) => {
    const task = new Task( {
        ...req.body,
        owner: req.user._id,
    });
    try {
        await task.save();
        res.status(200).send("Tâche sauvegardée : " + task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ a task

router.get('/tasks', auth, async( req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] = "desc" ? -1 : 1;
    }
    
});