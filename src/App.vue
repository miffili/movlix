<template>
<div id="app">
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Movlix 🎥" />
  <MovieForm v-on:addMovie="addMovie" :movieData="newMovie" type="add"/>
  <MovieCard v-for="(movie, index) in movies" :key="movie.id" :data-index="index" :movieData="movie" v-on:remove="removeMovie"/>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MovieCard from './components/MovieCard.vue'
import MovieForm from './components/MovieForm.vue'

import movies from './assets/seedMovies.js'

export default {
  name: 'app',
  data: function() {
    return {
      movies: movies,
      succId: 0,
      newMovie: {
        id: 0,
        title: '',
        year: '',
        length: '',
        rating: '',
        desc: ''
      }
    }
  },
  components: {
    HelloWorld,
    MovieCard,
    MovieForm
  },
  mounted() {
    if (localStorage.getItem('movlix-movies')) {
      try {
        this.movies = JSON.parse(localStorage.getItem('movlix-movies'));
        this.succId = localStorage.succId;
      } catch (e) {
        // console.error("couldn't fetch localStorage");
        localStorage.removeItem('movlix-movies');
        localStorage.removeItem('succId');
      }
    } else {
      this.succId = this.movies.length + 1;      
    }
  },
  watch: {
    movies() {
      localStorage.setItem('movlix-movies', JSON.stringify(this.movies));
    },
    succId() {
      localStorage.succId = this.succId;
    }
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

</style>
