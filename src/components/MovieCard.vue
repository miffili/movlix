<template>
<div class="movieCard">
  <div class="closedCard">
    <div
      v-if="!editOpen"
      class="displayInfo"
      :class="{'edit-movie': editOpen}"
    >
      <div class="cardHead">
        <h3>
          {{ movieData.title }}
        </h3>
        <p>{{ movieData.year }}</p>
      </div>
      <div class="cardDesc">
        <p v-if="movieData.desc">{{ movieData.desc }}</p>
        <p v-else><em>Description not provided</em></p>
      </div>
      <div class="cardDetails">
        <!-- Length -->
        <span v-if="movieData.length"><em>{{ prettyLength }}</em></span>
        <RateMovie
          :grade="ratingInNumber"
          :maxStars="5"
          :hasCounter="true"
          :movieId="this.movieData.id"
        />
      </div>
    </div>
    <div
      v-else
      class="editInfo"
      :class="{'edit-movie': editOpen}"
    >
      <MovieForm
        :movieId="movieData.id"
        :movieData="editedMovie"
        :type="'editMovie'"
        v-on:dataEdit="reflectChanges"
      />
      <span
        class="invalid"
        v-if="invalidForm"
      >Please correct the marked fields.</span>
    </div>
    <div class="cardFunctions">
      <button
        type="button"
        name="remove"
        class="delete"
        v-on:click="$emit('remove', $event.target)"
      >Delete Movie</button>
      <button
        type="button"
        name="edit"
        class="primary"
        v-on:click="toggleEdit"
        v-if="!editOpen"
      >Edit</button>
      <div v-else>
        <button
          type="button"
          name="cancel"
          class="secondary"
          v-on:click="cancelEdit"
        >Cancel</button>
        <button
          type="button"
          name="save"
          class="primary"
          v-on:click="saveChanges"
          :disabled="invalidForm"
        >Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import RateMovie from './RateMovie.vue'
import MovieForm from './MovieForm.vue'
export default {
  data() {
    return {
      openCard: false,
      editOpen: false,
      editedMovie: {
        title: this.movieData.title,
        year: this.movieData.year,
        length: this.movieData.length,
        desc: this.movieData.desc,
      },
      receivedData: '',
      enableSaving: true,
      invalidInput: false
    }
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
  methods: {
    toggleEdit: function() {
      this.editOpen = !this.editOpen
    },
    reflectChanges: function( emittedData, enableSaving ) {
      if ( enableSaving !== this.enableSaving ) {
        this.enableSaving = enableSaving;
        this.invalidInput = false;
      }
      if ( emittedData.title !== this.editedMovie.title ) this.editedMovie.title = emittedData.title;
      if ( emittedData.year !== this.editedMovie.year ) this.editedMovie.year = emittedData.year;
      if ( emittedData.desc !== this.editedMovie.desc ) this.editedMovie.desc = emittedData.desc;
      if ( emittedData.length !== this.editedMovie.length ) this.editedMovie.length = emittedData.length;
    },
    cancelEdit: function() {
      this.toggleEdit();
      this.editedMovie.title = this.movieData.title;
      this.editedMovie.year = this.movieData.year;
      this.editedMovie.length = this.movieData.length;
      this.editedMovie.desc = this.movieData.desc;
    },
    saveChanges: function() {
      if ( this.enableSaving ) {
        this.toggleEdit();
        this.$emit( 'save', this.movieData.id, this.editedMovie );
      } else {
        this.invalidInput = true;
      }
    }
  },
  computed: {
    prettyLength: function() {
      const length = this.movieData.length;
      const hours = length > 60 ? `${Math.floor(length/60)}h` : '';
      const minutes = `${length % 60}min`
      return `${hours} ${minutes}`;
    },
    ratingInNumber: function() {
      const grade = this.movieData.rating;
      return parseInt( grade );
    },
    invalidForm: function() {
      return ( this.invalidInput && !this.disableSave );
      // return false;
    }
  },
  components: {
    RateMovie,
    MovieForm
  }
}
</script>

<style lang="css" scoped>
  .movieCard {
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: .25rem .25rem 1rem 0 hsla(0, 0%, 0%, 0.1);
    background-color: white;
    margin-bottom: 1rem;
    box-sizing: border-box;
    position: relative;
  }
  .movieCard:hover {
    /* transform: scale(1.05); */
  }
  .movieCard>div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 4rem;
  }
  .cardHead {
    display: flex;
    align-items: baseline;
    width: 100%;
  }
  h3 {
    padding-right: 0.5rem;
    font-size: 1.3rem;
  }
  .title {
    padding-right: 0.5rem;
  }
  .year {
    opacity: 0.4;
    font-size: 1rem;
    margin: 0;
  }
  .cardDesc {
    max-width: 100%;
  }
  .cardDesc p {
    padding-right: 0.5rem;
  }
  .cardDetails {
    display: flex;
    width: 100%;
  }
  .cardDetails > * {
    padding: 0 0.5rem;
    border-left: 1px solid black;
  }
  .cardDetails>*:first-child {
    border-left: none;
    padding-left: 0;
  }
  .cardFunctions {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    box-sizing: border-box;
  }
  .cardFunctions button:first-child {
    margin-right: 0.5rem;
  }
  button.delete {
    border: 1px solid hsla(0, 100%, 31%, 0.8);
    color: hsla(0, 100%, 31%, 0.8);
  }
  .editInfo {
    margin-bottom: 0.5rem;
    width: 100%;
  }
  .editInfo .invalid {
    font-size: 0.85rem;
    color: red;
  }
</style>
