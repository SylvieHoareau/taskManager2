import { Task } from '../models/task.js';

// CREATE : Ajouter une nouvelle tâche à partir des données du formulaire et vers la base de données
exports.createTask = async (req, res) => {
    try {
        const { task, completed } = req.body;
        const newTask = new Task({ task, completed });
        await newTask.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'ajout de la tâche.');
    }
}

// READ: Afficher la iste des tâches
exports.getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.render('index', {tasks});
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des tâches.');
    }
}

// UPDATE : Marquer une tâche comme terminée
exports.markCompleted = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndUpdate(taskId, {completed: true});
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la mise à jour de la tâche.');
    }
}

// DELETE : Supprimer une tâche
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndRemove(taskId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la suppression de la tâche.');
    }
}
