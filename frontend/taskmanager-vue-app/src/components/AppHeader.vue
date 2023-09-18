<template>
   <header>
      <h1>{{ msg }}</h1>
      <font-awesome-icon icon="fa-solid fa-circle-user" />
   </header>
</template>
  
  <script>
  export default {
    name: 'AppHeader',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
    header {
        background-color: var(--secondary-color);
        padding: 1em;
        box-shadow: 0.5em 0.5em 0.5em rgba(187, 107, 126, 0.5);
        display: flex;
        justify-content: space-around;
        margin-top: 0;
        margin-bottom: 1em;
    }

    header h1, header i {
        color: var(--bg-color);
        font-size: 5rem;
    }

    .font-awesome-icon {
        font-size: 5rem;
    }

  </style>
  