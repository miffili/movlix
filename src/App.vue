<template>
<div id="app">
  <TheHeader v-on:toggleForm="toggleForm" />
  <main>
    <FormAddMovie v-if="showForm" v-on:addMovie="addMovie" v-on:cancel="toggleForm" :movieData="newMovie" />
    <MovieCard v-for="(movie, index) in movies" :key="movie.id" :data-index="index" :movieData="movie" v-on:remove="removeMovie" />
  </main>
</div>
</template>

<script>
import MovieCard from './components/MovieCard.vue'
import FormAddMovie from './components/FormAddMovie.vue'
import TheHeader from './components/TheHeader.vue'

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
      },
      showForm: true,
    }
  },
  components: {
    MovieCard,
    FormAddMovie,
    TheHeader
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
    addMovie: function(formMovie) {
      const createMovie = {
        id: this.succId,
        title: formMovie.title,
        year: formMovie.year,
        length: formMovie.length,
        desc: formMovie.desc
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
      this.toggleForm();
    },
    toggleForm: function() {
      this.showForm = !this.showForm
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0;
}
main {
  width: 60vw;
  margin: 1rem auto;
}
a {
  color: inherit;
  text-decoration: none;
}
h3 {
  margin: 0.5rem 0;
}
button {
  border: none;
  border-radius: 3px;
  background: none;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  padding: 0.5rem 1rem;
}
button.primary {
  border: 2px solid hsla(265, 100%, 31%, 1);
  background-color: hsla(265, 100%, 31%, 1);
  color: white;
  font-weight: bold;
}
button.secondary {
  border: 2px solid hsla(265, 100%, 31%, 0.75);
  color: hsla(265, 100%, 31%, 1);
}
button:hover {
  box-shadow: 0.1rem 0.1rem 0.2rem 0.02rem rgba(0, 0, 0, 0.2);
  transform: translateY(-0.05rem);
}
</style>
