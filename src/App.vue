<template>
<div id="app">
  <TheHeader v-on:toggleForm="toggleForm" />
  <main>
    <MovieForm
      v-if="showForm"
      v-on:addMovie="addMovie"
      v-on:cancel="toggleForm"
      :movieData="newMovie"
      :type="'addMovie'"
    />
    <MovieCard
      v-for="(movie, index) in movies"
      :key="movie.id"
      :data-index="index"
      :movieData="movie"
      v-on:remove="removeMovie"
      v-on:save="updateMovie"
    />
  </main>
</div>
</template>

<script>
import MovieCard from './components/MovieCard.vue'
import MovieForm from './components/MovieForm.vue'
import TheHeader from './components/TheHeader.vue'
import {
  EventBus
} from './Events.js'
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
        desc: '',
        rating: '',
      },
      showForm: false,
      updateRating: {
        updatedId: '',
        stars: ''
      }
    }
  },
  components: {
    MovieCard,
    MovieForm,
    TheHeader
  },
  mounted() {
    if ( localStorage.getItem( 'movlix-movies' ) ) {
      try {
        this.movies = JSON.parse( localStorage.getItem( 'movlix-movies' ) );
        this.succId = parseInt( localStorage.succId );
      } catch ( e ) {
        // console.error("couldn't fetch localStorage");
        localStorage.removeItem( 'movlix-movies' );
        localStorage.removeItem( 'succId' );
      }
    } else {
      this.succId = this.movies.length + 1;
    }
    EventBus.$on( 'updateRating', ( updatedRating, movieId ) => {
      this.updateRating = {
        updatedId: movieId,
        stars: updatedRating
      }
    } );
  },
  watch: {
    movies() {
      localStorage.setItem( 'movlix-movies', JSON.stringify( this.movies ) );
    },
    succId() {
      localStorage.succId = this.succId;
    },
    updateRating() {
      const movId = this.updateRating.updatedId;
      const movStars = this.updateRating.stars;
      const movieIndex = this.getIndex( movId );
      this.movies[ movieIndex ].rating = movStars;
    }
  },
  methods: {
    removeMovie: function( target ) {
      this.movies.splice( target.dataIndex, 1 );
    },
    addMovie: function( formMovie ) {
      const createMovie = {
        id: this.succId,
        title: formMovie.title,
        year: formMovie.year,
        length: formMovie.length,
        desc: formMovie.desc,
        rating: ''
      }
      this.movies.splice( 0, 0, createMovie );
      this.newMovie = {
        id: 0,
        title: '',
        year: '',
        length: '',
        desc: '',
        rating: '',
      }
      this.succId++;
      this.toggleForm();
    },
    updateMovie: function( id, data ) {
      const movieIndex = this.getIndex( id );
      // console.log( id, this.movies[ id ] );
      if ( data.title !== this.movies[ movieIndex ].title ) {
        this.movies[ movieIndex ].title = data.title;
      }
      if ( data.year !== this.movies[ movieIndex ].year ) {
        this.movies[ movieIndex ].year = data.year;
      }
      if ( data.desc !== this.movies[ movieIndex ].desc ) {
        this.movies[ movieIndex ].desc = data.desc;
      }
      if ( data.length !== this.movies[ movieIndex ].length ) {
        this.movies[ movieIndex ].length = data.length;
      }
    },
    toggleForm: function() {
      this.showForm = !this.showForm
    },
    getIndex: function( elId ) {
      return this.movies.findIndex( ( movie ) => movie.id === elId )
    }
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
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
  /* text-transform: uppercase; */
  letter-spacing: 0.1rem;
  padding: 0.5rem 1rem;
  font-family: inherit;
  box-sizing: border-box;
  font-weight: normal;
}

button.primary {
  border: 2px solid hsla(265, 100%, 31%, 1);
  background-color: hsla(265, 100%, 31%, 1);
  color: white;
  font-weight: 600;
}

button.secondary {
  border: 2px solid hsla(265, 100%, 31%, 0.75);
  color: hsla(265, 100%, 31%, 1);
}

button:hover {
  box-shadow: 0.1rem 0.1rem 0.2rem 0.02rem rgba(0, 0, 0, 0.2);
  transform: translateY(-0.15rem);
}
</style>
