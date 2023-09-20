// import fetch from 'fetch';

// const url = 'http://localhost:3000';

// fetch(url)
//     .then((response) => {
//         console.log(response.json());
//     })
//     .then((data))
//     .catch((error) => {
//         console.log(error);
//     });

// Crée une instance de l'objet vue
const app = Vue.createApp ( {
    data() {
        return {
            tasks: [
                {id: 1, name: 'Tâche 1', completed:true}, 
                {id: 2, name: 'Tâche 2', completed:true}, 
                {id: 3, name: 'Tâche 3', completed:true}, 
            ],
            newTaskName: ''
        }
    }, 
    methods: {
        addTask() {
            // Ajouter une nouvelle tâche à la liste de tâche
            this.tasks.push( {
                id: this.tasks.length + 1,
                name: this.newTaskName,
                completed: false
            });

            // Réinitialiser le champ de texte
            this.newTaskName = '';
        }, 
        editTask(task) {
            console.log('Edition de la tâche : ', task);
        }, 
        deleteTask(task) {
            // Logique de suppression de la tâche
            console.log('Suppression de la tâche : ', task);
        }
    }
});

app.mount('#app');