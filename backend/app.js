import express from 'express';
import dotenv from 'dotenv';
// bodyParser est une dépendance du framework Express.js
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import path from 'path';
import Task from './src/models/task.js';
// import { check, validationResult } from 'validator';
import pkg from 'validator';
const { check, validationResult } = pkg;
// import des fonctions du controller 
import addTask from './src/controller/addTask.js';
import editTask from './src/controller/editTask.js';
import deleteTask from './src/controller/deleteTask.js';
// import { taskRouter } from './src/routers/task.js';
// import { userRouter } from './src/routers/user.js';

/**
 * Partie 1 : Configuration et initialisation
 * */

// Configuration de variables d'environnement
dotenv.config();

// Obtenir le chemin actuel du module
const __filename = fileURLToPath(import.meta.url);
// Obtenir le répertoire parent du fichier actuel
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Partie 2 : middleware et traitement des requêtes
 * */

// Middleware pour traiter les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Dans l'application, middleware pour le gestionnaire de routes
app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

// Configuration pour pouvoir accéder aux fichiers statiques depuis le dossier views
app.use(express.static(path.join(__dirname, 'views')));

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://admin:admin@localhost.7tofdzv.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log('Connexion réussie à la base de données MongoDB');
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données MongoDB', error);
    });

// Moteur de modèle de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 *  Partie 3 - Les routes 
 * */ 

// Routes pour la View

// Logging the app start
// Middleware pour les fichiers statiques du répertoire 'public
// app.use('/static', express.static(path.join(__dirname, 'public')));

// Gestionnaire de route pour afficher la page 404.ejs
app.get('/404', (req, res) => {
    res.render('404'); // Rend la page 404.ejs
});

// Gestionnaire de route pour afficher la page 404.ejs
app.get('/login', (req, res) => {
    res.render('login'); // Rend la page login.ejs
});

// Gestion de route pour accéder au fichier CSS
app.get('/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(__dirname + '/views/style.css');
});

// Controller

// READ

// Gestionnaire de route pour afficher la page index.ejs
app.get('/', (req, res) => {
    const data = {
        tasks : [
            {id: 1, titre: 'Apprendre NODE JS', completed: true, owner:"sylvie"},
            {id: 2, titre: 'Apprendre VUE JS', completed: true, owner: "sylvie"},
            {id: 3, titre: 'Apprendre à apprendre', completed: true, owner: "sylvie"},
        ]
    }
    res.render('index', data); // Rend la page index.ejs
});

// Récupérer les tâches incluant les données de l'utilisateur
app.get('/user/tasks', async (req, res) => {
    // Pour récupérer les tâches ajoutées par l'utilisateur
    try {
        const { titre, completed, owner } = req.body;

        // Insérer la tâche dans la base de données MongoDB
        const task = new Task({titre, completed, owner});
        savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la tâche ', error);
        res.status(500).json({error: 'Erreur lors de l\'insertion de la tâche', error});
    }

    Task.find()
    .populate('owner', 'name')
    .exec((err, tasks) => {
        if (err) {
            console.error('Erreur lors de la récupération des tâches', err);
        }
        else {
            // Pour afficher la liste des tâches avec les utilisateurs
            res.render('index', { tasks });
        }
    });
});

// CREATE - Définir la route pour gérer les requêtes de l'interface

// Créer une nouvelle tâche

app.post('/tasks', async (req, res) => {
    try {
        const { titre, completed, owner } = req.body;

        // Insérer la tâche dans la base de données
       const task = new Task({titre, completed, owner});
       savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la tâche', error );
        res.status(500).json({error: 'Erreur lors de l\'insertion de la tâche', error})
    }
});

// Créer un nouvel utilisateur

app.post('/login/users', async (req, res) => {
    try {
        const { name, age, email, password } = req.body;

        // Insérer la tâche dans la base de données
       const task = new Task({titre, completed, owner});
       savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la tâche', error );
        res.status(500).json({error: 'Erreur lors de l\'insertion de la tâche', error})
    }
});



// UPDATE - Définir la route pour éditer une tâche

app.put('/tasks/:id', async (req, res) => {
    try {

        const taskId = req.params.id;

        // Obtenir les données de la tâche
        const udpatedTask = {
            id: req.params.id,
            titre: req.body.titre,
            completed: req.body.completed,
            owner: req.body.owner.name,
        }
        
        // Valider les données de la tâche
        editTask(taskId, udpatedTask);

        // Renvoyer une réponse de réussite
        res.status(200).json( { message : 'Tâche éditée avec succès !' });
    }
    catch (error) {
        console.error('Erreur lors de l\'édition de la tâche', error );
        res.status(500).json({error: 'Erreur lors de l\'édition de la tâche', error})
    }
});

// DELETE - Définir la route pour supprimer une tâche

app.delete('/tasks/:id', (req, res) => {
    // Obtenir l'identifiant de la tâche à supprimer
    try {
        // Obtenir l'identifiant de la tâche à supprimer
        const taskId = req.params.id;

        // Appeler la fonction deleteTask
        deleteTask(taskId);

        // Renvoyer une réponse de réussite
        res.status(200).send('Tâche supprimée');
        
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche', error);
        res.status(500).json({error: 'Erreur lors de la suppression de la tâche', error})
    }
  
})

const port = 3000;
app.listen(port, () => console.log('Le serveur fonctionne !'));
