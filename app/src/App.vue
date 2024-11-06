<script setup>
import Globe from './components/Globe.vue'
</script>

<template>
  <div id="app">
    <header><h1>Places</h1></header>
    <main><Globe /></main>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Globe,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #35495e;
  color: white;
}

nav a {
  margin: 0 15px;
  color: white;
  text-decoration: none;
}

footer {
  margin-top: 20px;
}
</style>
