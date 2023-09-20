import axios from 'axios';

// Editer une tâche 

const editTask = (taskId, updatedTask) => {

    // Obtenir l'identifiant de la tâche à supprimer
    const taskId = this.task.id;

    // Envoyer une demande PUT au backend
    axios.put('/tasks/' + taskId, updatedTask)
        .then((response) => {
            // Afficher un message de réussite
            console.log(response);
        })
        .catch((error) => {
            // Afficher un message d'erreur
            console.log(error);
        });
}

export default editTask;