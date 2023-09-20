import axios from 'axios';

// Supprimer une tâche

const deleteTask = (taskId) => {
    // Obtenir l'identifiant de la tâche à supprimer
    const taskId = this.task.id;

    // Envoyer une demande DELETE au backend
    axios.delete('/tasks' + taskId)
         .then((response) => {
             // Afficher un message de réussite
             console.log(response);
         })
         .catch((error) => {
             // Afficher un message d'erreur
             console.log(error);
         });
}

export default deleteTask;