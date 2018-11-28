<template>
<div class="movie-card">
  <div
    v-if="!openForm"
    class="display-info"
    :class="{'open' : openMenu}"
  >
    <div class="card-head">
      <h3 class="title">
        {{ movieData.title }}
        <span class="year">{{ movieData.year }}</span>
      </h3>
    </div>
    <div class="card-desc">
      <p v-if="movieData.desc">{{ movieData.desc }}</p>
      <p v-else><em>Description not provided</em></p>
    </div>
    <div class="card-details">
      <span v-if="movieData.length" class="length">
        {{ prettyLength }}
      </span>
      <MovieRating
        :grade="ratingInNumber"
        :movieId="this.movieData.id"
      />
      <button
        type="button"
        :name="openMenu? 'close menu' : 'open menu'"
        class="toggle no-btn"
        @click="toggle('openMenu')"
        :class="{'toggle-open': openMenu}"
        :title="openMenu? 'close menu' : 'open menu'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
          <path
            d="M3 20L38.2863 58.5797C39.4757 59.88 41.5243 59.88 42.7137 58.5797L78 20"
            stroke-width="8"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </div>
  <div v-else class="edit-info">
    <MovieForm
      :movieData="editMovie"
      :type="'editMovie'"
      @dataEdit="reflectEdit"
    />
    <span class="invalid" v-if="invalidForm">
      Please correct the marked fields.
    </span>
  </div>
  <div v-if="openMenu" class="card-functions">
    <button
      type="button"
      name="remove"
      class="delete"
      @click="$emit('remove', $event.target)"
    >Delete Movie</button>
    <button
      type="button"
      name="edit"
      class="primary"
      @click="toggle('openForm')"
      v-if="!openForm"
    >Edit</button>
    <div v-else class="edit-buttons">
      <button
        type="button"
        name="cancel"
        class="secondary"
        @click="cancelEdit"
      >Cancel</button>
      <button
        type="button"
        name="save"
        class="primary"
        @click="saveChanges"
        :disabled="invalidForm"
      >Save</button>
    </div>
  </div>
</div>
</template>

<script>
import MovieRating from './MovieRating.vue'
import MovieForm from './MovieForm.vue'

export default {
  name: "MovieCard",
  components: {
    MovieRating,
    MovieForm
  },
  props: {
    movieData: {
      id: Number,
      title: String,
      year: Number,
      length: Number,
      rating: [ String, Number ],
      desc: String
    }
  },
  data() {
    return {
      openMenu: false,
      openForm: false,
      editMovie: {
        id: this.movieData.id,
        title: this.movieData.title,
        year: this.movieData.year,
        length: this.movieData.length,
        desc: this.movieData.desc,
      },
      enableSaving: true,
      invalidInput: false
    }
  },
  computed: {
    prettyLength: function() {
      const length = this.movieData.length
      const hours = length >= 60 ? `${Math.floor(length/60)}h` : ''
      const minutes = length % 60 > 0 ? ` ${length % 60}min` : ''
      return `${hours}${minutes}`
    },
    ratingInNumber: function() {
      return parseInt( this.movieData.rating )
    },
    invalidForm: function() {
      return this.invalidInput === true && this.enableSaving === false
    }
  },
  methods: {
    toggle: function( el ) {
      this[ el ] = !this[ el ]
    },
    reflectEdit: function( formMovie, enableSaving, invalidInput ) {
      this.invalidInput = invalidInput
      if ( enableSaving !== this.enableSaving ) {
        this.enableSaving = enableSaving;
      }
      if ( formMovie.title !== this.editMovie.title ) this.editMovie.title = formMovie.title;
      if ( formMovie.year !== this.editMovie.year ) this.editMovie.year = formMovie.year;
      if ( formMovie.desc !== this.editMovie.desc ) this.editMovie.desc = formMovie.desc;
      if ( formMovie.length !== this.editMovie.length ) this.editMovie.length = formMovie.length;
    },
    cancelEdit: function() {
      this.toggle( 'openForm' );
      this.editMovie.title = this.movieData.title;
      this.editMovie.year = this.movieData.year;
      this.editMovie.length = this.movieData.length;
      this.editMovie.desc = this.movieData.desc;
    },
    saveChanges: function() {
      if ( this.enableSaving ) {
        this.toggle( 'openForm' );
        this.$emit( 'save', this.editMovie );
      } else {
        this.invalidInput = true;
      }
    }
  },
}
</script>

<style lang="css" scoped>
  .movie-card {
    width: 100%;
    max-width: 800px;
    position: relative;
    margin-bottom: 0.8rem;
    padding: 1rem 2rem 1.5rem;
    background-color: hsla(265, 100%, 99.8%, 1);
    box-shadow: 0 0.05rem 0.1rem 0 hsla(0, 0%, 0%, 0.1);
    box-sizing: border-box;
    border-radius: 4px;
  }
  .movie-card:hover {
    box-shadow: .25rem .25rem 0.4rem 0 hsla(0, 0%, 0%, 0.05);
    transform: translateY(-1px) scale(1.01);
  }
  .display-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 0rem;
  }
  .open {
    padding-bottom: 6rem;
  }
  .card-head {
    width: 100%;
    display: flex;
    align-items: baseline;
  }
  .card-head .title {
    margin-bottom: 0;
  }
  .card-head .year {
    padding-left: 0.3rem;
    font-size: 1rem;
    font-weight: 400;
    color: hsla(0, 0%, 32%, 0.8);
  }
  .card-desc {
    flex-grow: 1;
    width: 100%;
  }
  .card-desc p {
    padding-right: 0.5rem;
  }
  .card-details {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  .length {
    padding-right: 0.75rem;
    margin-right: 0.75rem;
    font-size: 0.9rem;
    color: hsla(0, 0%, 32%, 0.8);
    border-right: 2px solid hsla(0, 0%, 32%, 0.8);
  }
  .toggle {
    width: 1rem;
    height: 1rem;
    padding-right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    border: none;
    right: 0;
    transition: transform 0.3s;
    cursor: pointer;
  }
  .open .toggle-open {
    transform: scaleY(-1);
  }
  .toggle svg {
    width: 100%;
    height: 100%;
    stroke: hsla(0, 0%, 32%, 0.8);
  }
  .card-functions {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1rem 2rem;
    background-color: rgba(0, 0, 0, 0.035);
    box-sizing: border-box;
  }
  .card-functions button{
    width: 100%;
    margin-top: 0.4rem;
  }
  button.delete {
    margin-top: 0;
  }
  .edit-info {
    width: 100%;
    margin-bottom: 0.5rem;
    padding-bottom: 8rem;
  }
  .edit-info .invalid {
    font-size: 0.85rem;
    color: hsla(0, 100%, 37%, 0.8);
  }

  @media (min-width: 450px) {
    .open {
      padding-bottom: 4rem;
    }
    .display-info ~ .card-functions {
      flex-direction: row;
    }
    .display-info ~ .card-functions button{
      width: auto;
    }
  }
  
  @media (min-width: 576px) {
    .movie-card {
      max-width: 800px;
    }
    .open {
      padding-bottom: 4rem;
    }
    .card-functions {
      flex-direction: row;
    }
    .card-functions button{
      width: auto;
    }
    .edit-info {
      padding-bottom: 3.375rem;
    }
    .edit-buttons button:first-child {
      margin-right: 0.5rem;
    }
  }
</style>
