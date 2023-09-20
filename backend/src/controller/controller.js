import { Task } from '../models/task.js';

const newTask = new Task( {
    title: 'Ma première tâche',
    completed: false
});

// CREATE : Ajouter une nouvelle tâche à partir des données du formulaire et vers la base de données
newTask.save((err) => {
    try {
       console.log('Tâche sauvegardée avec succès !');
    } catch (error) {
        console.log('Erreur lors de la sauvegarde de la tâche :', error);
    }
});

// READ: Afficher la liste des tâches
Task.find({}, (err, tasks) => {
    try {
        console.log('Tâches trouvées : ', tasks);
    } catch (error) {
         console.log('Erreur lors de la recherche de la tâche :', error);
    }
});

// UPDATE : Mettre à jour des tâches
Task.updateOne({ _id:'ID_DE_LA_TACHE'}, { title: 'Nouveau titre'}, (err) => {
    try {
        console.log('Tâche mise à jour avec succès ! ');
    } catch (error) {
         console.log('Erreur lors de la mise à jour de la tâche :', error);
    }
});

// DELETE : Supprimer une tâche
Task.deleteOne({ _id:'ID_DE_LA_TACHE'}, (err) => {
    try {
        console.log('Tâche supprimée avec succès');
    } catch (error) {
         console.log('Erreur lors de la suppression de la tâche :', error);
    }
});
