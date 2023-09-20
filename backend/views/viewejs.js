// Script pour faire le lien entre le backend et le frontend

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

// Editer une tâche 

const editTask = (taskId, updatedTask) => {

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

const deleteTask = (taskId) => {
    // Obtenir l'identifiant de la tâche à supprimer
    // const taskId = this.task.id;

    // Envoyer une demande DELETE au backend
    axios.delete('/tasks/' + taskId)
         .then((response) => {
             // Afficher un message de réussite
             console.log(response);
         })
         .catch((error) => {
             // Afficher un message d'erreur
             console.log(error);
         });
}

