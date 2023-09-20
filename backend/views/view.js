const app = Vue.createApp( {
    data()  {
        return {
            // Initialiser la variable uniqueId
            uniqueId: 0,
            tasks: [], 
            newTaskName: '',
        };
    }, 
    watch: {
        tasks: {
            handler(newTasks) {
                // Emettre l'évenement pour mettre à jour la tâche dans le props parent
                this.$emit('update:tasks',  newTasks);
            },
            deep: true,
        } 
    },
    methods: {
        // CREATE TASK
        addTask() {
           // Axios pour ajouter un tâche via l'API située en backend
           axios.post('/api/tasks', { titre: this.newTaskName})
           .then(response => {
                // Récupérer les nouvelles tâches
                this.tasks.push(response.data);
                this.newTaskName = '';
           })
           .catch(error => {
                console.log('Erreur lors de l\'ajout de la tâche', error);
           })
        }, 
        // UPDATE TASK
        updateTasks(newTasks) {
            this.tasks = newTasks;
        }, 
        edit(task) {
            console.log(`Edition de la tâche : ${task.titre}`);
        },
        saveEditedTask(task) {
            task.editing = false;
            console.log(`Tâche éditée : ${task.titre}`);
        },
        // DELETE TASK
        deleteTask(task) {
            // Créer une copie de localTasks en excluant la tâche avec taskId
            const updatedTasks = this.localTasks.filter(task => task.id !== taskId);
            // Utilisez $emit pour mettre à jour la prop task
            this.$emit('updateTask', updatedTasks);
            console.log(`Suppression de la tâche avec l'ID : ${taskId}`);
        }, 
        created() {
            // Pour récupérer les tâches existantes via l'API
            axios.get('/api/tasks')
                .then(response => {
                    this.tasks = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des tâches', error);
            });
        }
    } 

});

app.mount('#app');