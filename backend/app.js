import express from 'express';
import dotenv from 'dotenv';
// bodyParser est une dépendance du framework Express.js
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import path from 'path';
import Task from './src/models/task.js';
import { taskRouter } from './src/routers/task.js';
import { userRouter } from './src/routers/user.js';

dotenv.config();

// Obtenir le chemin actuel du module
const __filename = fileURLToPath(import.meta.url);
// Obtenir le répertoire parent du fichier actuel
const __dirname = path.dirname(__filename);

const app = express();

// Middleware pour traiter les données JSON
app.use(bodyParser.json());

// Dans l'application, middleware pour le gestionnaire de routes
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://admin:admin@localhost.7tofdzv.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log('Connexion réussie à la base de données MongoDB');
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données MongoDB', error);
    });


// CREATE - Définir la route pour gérer les requêtes de l'interface
app.post('/tasks', async (req, res) => {
    try {
        const { titre, completed, owner } = req.body;

        // Insérer la tâche dans la base de données
        const task = new Task({titre, completed, owner});
        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la tâche', error );
        res.status(500).json({error: 'Erreur lors de l\'insertion de la tâche', error})
    }
});

// UPDATE - Définir la route pour éditer une tâche
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, completed, owner } = req.body;
        const task = await Task.findByIdAndUpdate(id, {titre, completed, owner}, {new: true});
    }
    catch (error) {
        console.error('Erreur lors de l\'édition de la tâche', error );
        res.status(500).json({error: 'Erreur lors de l\'édition de la tâche', error})
    }
});

// Logging the app start
// Middleware pour les fichiers statiques du répertoire 'public
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true}));

// Configuration pour pouvoir accéder aux fichiers statiques depuis le dossier views
app.use(express.static(path.join(__dirname, 'views')));

// Moteur de modèle de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Gestionnaire de route pour afficher la page index.ejs
app.get('/', (req, res) => {
    const data = {
        tasks : [
            {id: 1, name: 'Tâche 1', completed: true, owner:"sylvie"},
            {id: 2, name: 'Tâche 2', completed: true, owner: "sylvie"},
            {id: 3, name: 'Tâche 3', completed: true, owner: "sylvie"},
        ]
    };
    res.render('index', data); // Rend la page index.ejs
});

// Pour récupérer les tâches ajoutées par l'utilisateur
app.post('/tasks', async (req, res) => {
    try {
        const {titre, completed} = req.body;

        // Insérer la tâche dans la base de données MongoDB
        const task = new Task({titre, completed});
        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la tâche ', error);
        res.status(500).json({error: 'Erreur lors de l\'insertion de la tâche', error});
    }
})

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
    res.sendFile(__dirname + 'views/style.css');
})
  


const port = 3000;
app.listen(port, () => console.log('Le serveur fonctionne !'));
