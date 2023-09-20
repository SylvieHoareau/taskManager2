import axios from 'axios';

const addTask = () => {
    // Créer un nouvelle tâche
    const newTask = {
        titre: this.newTask,
        completed: false,
        owner: {
            name: 'John Doe',
        }
    };

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

const editTask = () => {
     // Obtenir l'identifiant de la tâche à mettre à jour
     const taskId = this.task.id;

     // Créer un objet JSON avec les nouvelles données de la tâche
     const updatedTask = {
         id: taskId,
         titre: this.task.titre,
         completed: this.task.completed,
     };
 
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

const deleteTask = () => {
    // Obtenir l'identifiant de la tâche à supprimer
    const taskId = this.task.id;

    // Envoyer une demande DELETE au backend
    axios.delete()
         .then((response) => {
             // Afficher un message de réussite
             console.log(response);
         })
         .catch((error) => {
             // Afficher un message d'erreur
             console.log(error);
         });
}
