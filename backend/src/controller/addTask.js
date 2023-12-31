import axios from 'axios';

// Ajouter une tâche 

const addTask = async (newTask) => {
    try {
        // Envoyer une demande POST au backend
        const task = await axios.post('/tasks', newTask);
        if (!task) {
            throw new Error('Erreur lors de la récupération de la tâche');
        }
        return task;
    } catch (error) {
        console.log('Erreur lors de l\'ajout de la tâche', error);
    }
}

export default addTask;