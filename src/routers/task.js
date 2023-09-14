import express from 'express';
import Task from '../models/task.js';
import auth from '../middleware/auth.js';

// Import du module router
const router = express.Router;

// CREATE a task

router.post('/tasks', auth, async( req, res) => {
    const task = new Task( {
        ...req.body, // ... spread operator toutes les propriétés de l'objet req.body sont copiées dans l'objet task
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
        // .split() pour diviser une chaîne de caractères en un tableau de sous-chaînes
        // Sous-chaîne 1 : nom du champ à trier createdAt - sous-chaîne 2 : ordre de tri desc
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] = "desc" ? -1 : 1;
    }
    try {
        await req.user
        // Populate sert à charger les tâches de l'utilisateur en cascade
        .populate( {
            path: "tasks",
            match, 
            options: {
                // Limiter le nombre de tâche à charger dans la requête HTTP
                limit: parseInt(req.query.limit),
                // Saute le nombre de tâche spécifié dans la requête HTTP
                skip: parseInt(req.query.skip),
                // Tri les tâches par date de début
                sort,
            }
        })
        // Exécute la liste des tâches
        .execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Opérations avec l'ID de task

// CREATE

router.get('tasks/:id', auth, async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        if(!task) {
            return res.status(401).send({error : 'L\'ID de la tâche n\'est pas trouvée.'});
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// UPDATE

router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['Task', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation) {
        return res.status(401).send({error : 'Mises à jour non autorisées.'});
    }
    try {
        const task = await Task.findOne( {
            _id: req.params.id,
            owner: req.user._id,
        });
        if(!task) {
            res.send({error: 'ID de la tâche introuvable pour la mise à jour.'});
        }
        res.send(task);
    }
    catch (error) {
        res.status(500).send({ error: "Erreur : ", error });
    }
});

export default router;