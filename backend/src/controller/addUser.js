import axios from 'axios';

// Ajouter un utilisateur

const addUser = async (newUser) => {
    try {
        // Envoyer une demande POST au backend
        const task = await axios.post('/login/users', newUser);
        if (!task) {
            throw new Error('Erreur lors de l\'enregistrement de l\'utilisateur');
        }
        return task;
    } catch (error) {
        console.log('Erreur lors de l\'ajout de la tâche', error);
    }
}

export default addUser;