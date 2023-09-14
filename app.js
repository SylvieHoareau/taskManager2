import express from 'express';
import mongoose from 'mongoose';
import { Task } from '../models/task.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

// Dans l'application
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Logging the app start

app.use('/static', express.static("public"));

app.use(express.urlencoded({ extended: true}));


// // CREATE - Pour récupérer les données depuis l'UI (user interface)
// app.post('/tache', async (req, res) => {
//     const task = new Task( {
//         content: req.body.content,
//     });
//     try {
//         await task.save();
//         res.redirect('/');
//     } catch (err) {
//         res.redirect('/');
//     }
// });

// // READ - Pour afficher l'UI (user interface)
// app.get('/', (req, res) => {
//     task.find({}, (err, tasks) => {
//         res.render("todo.ejs", { tasks: tasks });
//     });
// });

// // UPDATE - Pour mettre à jour la liste de tâches
// app
// .route('/edit/:id')
// .get((req, res) => {
//     const id = req.params.id;
//     task.find({}, (err, tasks) => {
//         res.render("todoEdit.ejs", { tasks: tasks, idTask: id });
//     });
// })
// .post((req, res) => {
//     const id = req.params.id;
//     task.findByIdAndUpdate(id, { content: req.body.content}, err => {
//         if (err) return res.status(500).send(err);
//         res.redirect('/');
//     });
// });

// // DELETE - Effacer des tâches
// app.route('/remove/:id').get((req, res) => {
//     const id = req.params.id;
//     task.findByIdAndRemove(id, err => {
//         if (err) return res.send(500, err);
//         res.redirect('/');
//     })
// });

// // Pour ajouter un utilisateur (user)
// const addUser = async (name, age, email, password) => {
//     try {
//         const user = new User( {
//             name,
//             age,
//             email,
//             password
//         });
//         await user.save();
//         console.log('Utilisateur ajouté avec succès.');
//     } catch (error) {
//         console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
//     }
// }

// // Utilisation de la fonction addUser
// addUser('John Doe', 30, 'john.doe@example.com', 'securepass');

// Modèle de vue
app.set("view engine", "ejs");

app.listen(3000, () => console.log('Le serveur fonctionne !'));