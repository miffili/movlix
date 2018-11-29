<template>
<div id="app">
  <TheHeader @toggleForm="toggleForm" :showForm="showForm" />
  <main>
    <p v-if="showNotification">There are no movies in the database yet.</p>
    <button
      type="button"
      name="loadMovies"
      v-if="showNotification"
      @click="loadSampleMovies"
      class="primary"
    >Load Sample Movies</button>
    <MovieForm
      v-if="showForm"
      @addMovie="addMovie"
      @toggleForm="toggleForm"
      :movieData="newMovie"
      :type="'addMovie'"
    />
    <MovieCard
      v-for="(movie, index) in movies"
      :key="movie.id"
      :movieData="movie"
      @remove="removeMovie(index)"
      @save="updateMovie"
    />
  </main>
  <TheFooter />
</div>
</template>

<script>
import MovieCard from './components/MovieCard.vue'
import MovieForm from './components/MovieForm.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

import {
  EventBus
} from './Events.js'
import movies from './assets/seedMovies.js'

export default {
  name: 'app',
  components: {
    MovieCard,
    MovieForm,
    TheHeader,
    TheFooter
  },
  data() {
    return {
      movies: [],
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
  watch: {
    succId() {
      localStorage.succId = this.succId
    },
    updateRating() {
      const movId = this.updateRating.updatedId
      const movStars = this.updateRating.stars
      const movieIndex = this.getIndex( movId )
      this.movies[ movieIndex ].rating = movStars
    }
  },
  mounted() {
    if ( localStorage.getItem( 'movlix-movies' ) ) {
      try {
        this.movies = JSON.parse( localStorage.getItem( 'movlix-movies' ) )
        this.succId = parseInt( localStorage.succId )
      } catch ( e ) {
        localStorage.removeItem( 'movlix-movies' )
        localStorage.removeItem( 'succId' )
      }
    } else {
      this.succId = this.movies.length + 1
    }
    EventBus.$on( 'updateRating', ( updatedRating, movieId ) => {
      this.updateLocalStorage()
      this.updateRating = {
        updatedId: movieId,
        stars: updatedRating
      }
    } );
  },
  computed: {
    showNotification: function() {
      return this.movies.length === 0 && !this.showForm
    }
  },
  methods: {
    loadSampleMovies: function() {
      this.movies = movies
      this.updateLocalStorage()
      this.succId = movies.length + 1
    },
    addMovie: function( formMovie ) {
      const createMovie = {
        id: this.succId,
        title: formMovie.title,
        year: formMovie.year,
        length: formMovie.length.replace( /^0+/, '' ),
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
      this.succId++
      this.toggleForm()
      this.updateLocalStorage()
    },
    updateMovie: function( editMovie ) {
      const movieIndex = this.getIndex( editMovie.id );
      if ( editMovie.title !== this.movies[ movieIndex ].title ) {
        this.movies[ movieIndex ].title = editMovie.title;
      }
      if ( editMovie.year !== this.movies[ movieIndex ].year ) {
        this.movies[ movieIndex ].year = editMovie.year;
      }
      if ( editMovie.desc !== this.movies[ movieIndex ].desc ) {
        this.movies[ movieIndex ].desc = editMovie.desc;
      }
      if ( editMovie.length !== this.movies[ movieIndex ].length ) {
        this.movies[ movieIndex ].length = editMovie.length.replace( /^0+/, '' );
      }
      this.updateLocalStorage()
    },
    removeMovie: function( index ) {
      this.movies.splice( index, 1 )
      this.updateLocalStorage()
    },
    updateLocalStorage: function() {
      localStorage.setItem( 'movlix-movies', JSON.stringify( this.movies ) )
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

<style lang="css">
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 0 5.25rem;
  color: #0c0b0f;
  background-color: hsla(265, 17%, 93%, 1);
  background-image: url('./assets/topography.svg');
  box-sizing: border-box;
}
main {
  margin: 1rem auto 0;
  padding: 0 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
a {
  color: inherit;
  text-decoration: none;
}
h3 {
  margin: 0.5rem 0;
  color: hsla(265, 100%, 20%, 1);
  font-size: 1.4rem;
}
button {
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  background: none;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 4px;
}
button:hover {
  box-shadow: 0.1rem 0.075rem 0.15rem 0.05rem hsla(0, 0%, 0%, 0.2);
  transform: translateY(-2px);
}
button.primary {
  border: 2px solid hsla(265, 100%, 31%, 1);
  background-color: hsla(265, 100%, 31%, 1);
  color: hsla(265, 10%, 94%, 1);
  font-weight: 600;
}
button.primary:hover {
  border: 2px solid transparent;
  background: linear-gradient(130deg, hsla(265, 100%, 32%, 1) 55.36%, hsla(245, 100%, 31.5%, 1) 100%);
}
button.secondary {
  background-color: hsla(265, 100%, 99.2%, 0.65);
  border: 1px solid hsla(265, 100%, 31%, 0.7);
  color: hsla(265, 100%, 31%, 1);
}
button.secondary:hover {
  background: linear-gradient(130deg, hsla(265, 100%, 32%, 0.75) 35.36%, hsla(245, 100%, 31.5%, 0.65) 100%);
  border: 1px solid hsla(265, 100%, 20%, 0.75);
  color: hsla(265, 10%, 94%, 1);
  text-shadow: 0 0 hsla(265, 10%, 94%, 1)
}
button.delete {
  border: 1px solid hsla(0, 100%, 31%, 0.5);
  color: hsla(0, 100%, 31%, 0.8);
}
button.delete:hover {
  border: 1px solid hsla(0, 100%, 31%, 0.5);
  background: linear-gradient(130deg, hsla(350, 100%, 24%, 0.62) 35.36%, hsla(0, 100%, 31%, 0.8) 100%);
  background: linear-gradient(130deg, hsla(0, 100%, 31%, 0.8) 35.36%, hsla(355, 100%, 24%, 0.7) 100%);
  color: hsla(265, 10%, 94%, 1);
  font-weight: 600;
}
button:disabled {
  opacity: 0.6;
}
.no-btn {
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
}
.no-btn:hover {
  box-shadow: none;
  transform: none;
}

@media (min-width: 576px) {
  main {
    width: 570px;
    margin: 1rem auto 0;
  }
}

@media (min-width: 992px) {
  main {
    min-width: 980px;
    width: 80vw;
    max-width: 1000px;
  }
}
</style>
