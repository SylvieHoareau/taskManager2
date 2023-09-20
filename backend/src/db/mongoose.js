import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Connexion à la base de données

// La variable d'environnement MONGO_URL contient le lien pour se connecter à la database
dotenv.config( { path: '../../../backend/.env' });

// Récupérer l'URL de la base de données à partir des variables d'environnement
// const mongoURL = process.env.MONGO_URL;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://admin:admin@localhost.7tofdzv.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log('Connexion réussie à la base de données MongoDB');
        // Interactions avec la base de données
        const db = mongoose.connection;
        // Je crée une collection (équivalent de la table en SQL)
        const collectionTask = db.collection('Task');
        //TEST
        const insertTasks = await collectionTask.insertMany([
            { titre: "Apprendre SQL", completed: true , owner: 'sylvie', timestamp: new Date}, 
            { titre: "Apprendre Vue JS", completed: false, owner: 'sylvie', timestamp: new Date}
        ]);
        const collectionUser = db.collection('User');
        const insertUsers = await collectionUser.insertMany([
            { username: "olivier", password: "password2", email:'olivier@example.com', timestamp: new Date},
            { username: "annette", password: "password2" , email:'annette@example.com', timestamp: new Date},
        ]);
        console.log(`Documents insérés => ${insertTasks} + ${insertUsers}`);
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données MongoDB', error);
    });