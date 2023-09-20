<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <AppHeader msg="TO DO LIST"></AppHeader>
  <div>
    <!--@task-added : pour écouter l'événement "task-added" -->
    <task-form @task-added="addTaskToList"></task-form>
    <h2>Ma liste de tâches</h2>
    <task-list :msg="YourMessage" :tasks="tasks"></task-list>
  </div>
</template>

<script>
  import AppHeader from '../components/AppHeader.vue';
  import TaskForm from '../components/TaskForm.vue';
  import TaskList from '../components/TaskList.vue';
  import validation from '../components/validation.js';

  export default {
    name: 'App',
    components: {
      AppHeader,
      TaskForm,
      TaskList,
    },
    data() {
      return {
        msg: 'TO DO LIST',
        tasks : [], // Liste de tâches
      }
    }, 
    methods: {
      addTaskToList(newTask) {
        // Ajouter la nouvelle tâche à la liste de tâche
        this.tasks.push({text: newTask, id: this.tasks.length + 1});
      }, 
      upadateTasks(newTasks) {
        this.tasks = newTasks;
      },   
      validate(data) {
        // Utiliser le module `validation` pour valider les données
        return validation.methods.validate(data);
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap');

  :root {
      --primary-color: #2AB840;
      --secondary-color: #FF2B5E;
      --tertiary-color: #BB6B7E;
      --accent-color: #72FC87;
      --bg-color: #000000;
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }

  body {
      font-family: 'Jost', sans-serif;
      background-color: var(--bg-color);
  }

  #app {
    font-family: 'Jost', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  main {
    color: black;
    background-color: var(--primary-color);
    margin: 5em;
    padding: 1em;
    box-shadow: 0.5em 0.5em 0.5em rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 2.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  h1 {
    color: var(--secondary-color);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-align: center;
  }

  h2 {
    color: var(--secondary-color);
    padding: 1em;
    text-transform: uppercase;
    font-size: 2rem;
  }

  p {
    color: white;
    text-align: center;
    font-size: 2.5rem;
  }

  img {
    width: 25em;
    height: 25em;
    border-radius: 100%;
    margin: 0.5em auto;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    cursor: pointer;
    padding: 1em;
    font-size: 1.5em;
  }

  
</style>
