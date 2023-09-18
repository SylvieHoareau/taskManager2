<template>
    <div class="liste">
      <h1>{{ msg }}</h1>
      <ul>
        <li v-for="task in tasks" :key="task.id">
            <p>{{ task.text}}</p>
            <button @click="edit(task)">Editer</button>
            <button @click="deleteTask(task.id)">Supprimer</button>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {

    name: 'TaskList',
    props: {
        msg: String
    },

    // Etat réactif
    data() {
        return {
            tasks: [
                { id: 1, text: "Ma Tâche 1" },
                { id: 2, text: "Ma Tâche 2" },

            ],
        }
    },

    // Méthode pouvant être utilisés dans le gestionnaire d'événements
    methods: {
        edit(task) {
            console.log(`Edition de la tâche : ${task.text}`);
        }, 
        deleteTask(taskId) {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
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
    }

    ul {
        list-style-type: none;
    }

    li {
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
</style>
  