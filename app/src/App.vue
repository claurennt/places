<template>
  <div id="app">
    <header>
      <h1>Welcome to My Vue App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 My Vue App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
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
  padding: 20px;
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
