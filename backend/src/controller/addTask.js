import axios from 'axios';

// Ajouter une tâche 

const addTask = (newTask) => {

    // Envoyer une demande POST au backend
    axios.post('/tasks', newTask)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            // Afficher un message d'erreur
            console.log(error);
        });
}

export default addTask;