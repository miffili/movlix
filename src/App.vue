<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Movlix 🎥"/>
    <MovieCard v-for="(movie, index) in movies" :key="movie.id" :index="index" :movieData="movie" v-on:log="removeMovie"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MovieCard from './components/MovieCard.vue'

import movies from './assets/seedMovies.js'

export default {
  name: 'app',
  data: () => ({
    movies: movies,
  }),
  components: {
    HelloWorld,
    MovieCard
  },
  methods: {
    removeMovie: function(target) {
      this.movies.splice(target.index, 1);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
