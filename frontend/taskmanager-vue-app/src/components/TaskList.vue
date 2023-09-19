<template>
    <div class="liste">
      <h1>{{ msg }}</h1>
      <ul>
        <li v-for="task in tasks" :key="task.id">
            <!-- Si la tâche n'est pas éditée -->
            <p v-if="!task.editing">{{ task.text}}</p>
            <!-- Si la tâche est éditée -->
            <input v-else v_model="task.text" @blur="saveEditedTask(task)" @keydown.enter="saveEditedTask(task)">
            <!-- Si pas d'édition, écrire Enregistrer sur le bouton sinon Editer -->
            <button @click="edit(task)">{{ task.editing ? 'Enregistrer' : 'Editer' }}</button>
            <button @click="deleteTask(task.id)">Supprimer</button>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
    name: 'TaskList',
    props: {
        msg: String, 
        tasks: Array,
    },

    data() {
        return {
            localTasks: [],
        };
    }, 
    // watch sert à mettre à jour localTasks lorque la prop tasks change
    watch: {
        tasks: {
            deep: true,
            handler(newTasks) {
                this.$emit('update:tasks', newTasks);
            },
        },
    },
    // Méthode pouvant être utilisés dans le gestionnaire d'événements
    methods: {
        edit(task) {
            task.editing = !task.editing;
        }, 
        saveEditedTask(task) {
            task.editing = false;
            // Evénément pour mettre à jour la tâche
            console.log(`Tâche éditée : ${task.text}`);
        },
        deleteTask(taskId) {
            // Créer une copie de localTasks en exculant la tâche avec taskId
            const updatedTasks = this.tasks.filter((task) => task.id !== taskId);
            // Utiliser $emit pour mettre à jour la propritét tasks dans le parent
            this.$emit('update:tasks', updatedTasks);
            console.log(`Suppression de la tâche avec l'ID : ${taskId}`);
        }
    }, 

    // hooks de cycle de vie
    mounted() {
        console.log(`La tâche ${this.task} a été ajoutée.`);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  

    section {
        margin: 1em;
        padding: 1em;
        color: white;
    }

    ul {
        list-style-type: none;
    }

    li {
        color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
        gap: 1em;
        width: 100%;
    }

    li a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
    }

    button {
        color: black;
        background-color: var(--secondary-color);
        margin: 1em;
        padding: 1em;
        border-radius: 1em;
        border: none;
    }
</style>
  