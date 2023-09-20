<template>
    <div class="form">
      <h1>{{ msg }}</h1>
      <form @submit.prevent="addUser">
        <input v-model="newTask" type="text" id="nom" placeholder="Nom" aria-label="nom"/>
        <input v-model="newTask" type="number" id="age" placeholder="Age" aria-label="age"/>
        <input v-model="newTask" type="email" id="email" placeholder="Email" aria-label="email"/>
        <input v-model="newTask" type="password" id="password" placeholder="Nom" aria-label="nom"/>
        <input type="submit" value="ajouter"/>
      </form>
    </div>
</template>
  
<script>
  export default {
    name: 'TaskForm',
    props: {
      msg: String
    },
    data() {
      return {
        newTask: '', // Pour stocker la nouvelle tâche saisie
      }
    }, 
    methods: {
      addTask() {
        // Informer le composant parent TaskList
        this.$emit('task-added', this.newTask);
        this.newTask = ''; // Réinitialiser le champ de saisie
      }
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  input[type="checkbox"] {
      font-size: 1.5rem;
      padding: 1em;
  }

  input[type="checkbox"]:checked {
      color: var(--secondary-color);
      font-size: 1.5rem;
  }

  input[type="text"] {
      border-radius: 1em;
      padding: 1em;
  }

  input[type="submit"] {
      border:none;
      border-radius: 1em;
      color: black;
      background-color: var(--secondary-color);
      font-weight: 700;
      padding: 1em;
  }
</style>
  