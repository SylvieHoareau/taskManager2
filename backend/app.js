import express from 'express';
import dotenv from 'dotenv';
import { taskRouter } from './src/routers/task.js';
import { userRouter } from './src/routers/user.js';
import path from 'path';

dotenv.config();

// Obtenir le chemin actuel du module
const __filename = new URL(import.meta.url).pathname;
// Obtenir le répertoire parent du fichier actuel
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

// Dans l'application, middleware pour le gestionnaire de routes
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Logging the app start
// Middleware pour les fichiers statiques du répertoire 'public
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true}));

// Moteur de modèle de vue
app.set("view engine", "ejs");

// Gestionnaire de route pour afficher la page d'accueil (index.html)
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath);
});

app.listen(port, () => console.log('Le serveur fonctionne !'));
