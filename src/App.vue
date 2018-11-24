<template>
<div id="app">
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Movlix 🎥" />
  <div class="movieForm">
    <fieldset>
      <label for="movie-title">Title</label>
      <input type="text" name="movie-title" v-model="newMovie.title" placeholder="">
    </fieldset>
    <fieldset>
      <label for="movie-year">Year</label>
      <input type="number" name="movie-year" v-model="newMovie.year">
    </fieldset>
    <fieldset>
      <label for="movie-length">Length (in min)</label>
      <input type="number" name="movie-length" v-model="newMovie.length">
    </fieldset>
    <fieldset>
      <label for="movie-rating">Rating (of 5)</label>
      <input type="number" name="movie-rating" v-model="newMovie.rating">
    </fieldset>
    <fieldset>
      <label for="movie-desc">Description</label>
      <textarea name="movie-desc" rows="6" cols="60" v-model="newMovie.desc"></textarea>
    </fieldset>
    <button type="button" name="button" v-on:click="addMovie">Add Movie</button>
  </div>
  <MovieCard v-for="(movie, index) in movies" :key="movie.id" :data-index="index" :movieData="movie" v-on:log="removeMovie" />
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
    succId: 7,
    newMovie: {
      id: 0,
      title: '',
      year: '',
      length: '',
      rating: '',
      desc: ''
    }
  }),
  components: {
    HelloWorld,
    MovieCard
  },
  methods: {
    removeMovie: function(target) {
      this.movies.splice(target.dataIndex, 1);
    },
    addMovie: function() {
      const createMovie = {
        id: this.succId,
        title: this.newMovie.title,
        year: this.newMovie.year,
        length: this.newMovie.length,
        rating: this.newMovie.rating,
        desc: this.newMovie.desc
      }
      this.movies.splice(0, 0, createMovie);
      this.newMovie = {
        id: 0,
        title: '',
        year: '',
        length: '',
        rating: '',
        desc: ''
      }
      this.succId++;
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
  margin: 0 auto;
  padding: 0;
}

.movieForm {
  width: 60vw;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  border-radius: 0 0 5px 5px;
}

.movieForm fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  margin: 0;
}

.movieForm * {
  width: 100%;
  box-sizing: border-box;
}

.movieForm button {
  margin: 0.5rem 0;
  padding: 0.25rem;
  text-transform: uppercase;
}
</style>
