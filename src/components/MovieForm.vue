<template>
<!-- ADD MOVIE -->
<form
  class="movie-form adding"
  v-if="type==='addMovie'"
  :key="'newMovie'"
>
  <fieldset>
    <h3>Add Movie</h3>
  </fieldset>
  <fieldset>
    <label for="title">Title <span class="required">*</span></label>
    <input
      type="text"
      name="title"
      v-model="formMovie.title"
      v-validate="'required'"
      :class="{ 'invalid': errors.has('addMovie.title')}"
      data-vv-scope="addMovie"
    >
    <span
      v-if="errors.has('addMovie.title')"
      class="invalid"
    >{{ errors.first('addMovie.title') }}</span>
    <!-- <span>{{ this.fields.$addMovie.title }}</span> -->
  </fieldset>
  <div class="movie-numbers">
    <fieldset>
      <label for="year">Year <span class="required">*</span></label>
      <input
        type="number"
        name="year"
        v-model="formMovie.year"
        min="1988"
        v-validate="'required|max_value:2030'"
        data-vv-validate-on="blur|change"
        :class="{ 'invalid': errors.has('addMovie.year')}"
        data-vv-scope="addMovie"
      >
      <span
        v-if="errors.has('addMovie.year')"
        class="invalid"
      >{{ errors.first('addMovie.year') }}</span>
    </fieldset>
    <fieldset>
      <label for="length">Length (in min)</label>
      <input
        type="number"
        name="length"
        v-model="formMovie.length"
        v-validate="'numeric|min:1'"
        :class="{ 'invalid': errors.has('addMovie.length')}"
        data-vv-scope="addMovie"
      >
      <span
        v-if="errors.has('addMovie.length')"
        class="invalid"
      >{{ errors.first('addMovie.length') }}</span>
    </fieldset>
  </div>
  <fieldset>
    <label for="desc">Description</label>
    <textarea
      name="desc"
      rows="6"
      cols="60"
      v-model="formMovie.desc"
      v-validate="'min:0'"
      :class="{ 'invalid': errors.has('addMovie.desc') }"
      data-vv-scope="addMovie"
    />
    <span v-if="errors.has('addMovie.desc')" class="invalid" >{{ errors.first('addMovie.desc') }}</span>
  </fieldset>
  <div v-if="type==='addMovie'" class="buttons">
    <span v-if="invalidInput" class="invalid" >Please correct the errors.</span>
    <span v-else class="info" >* required fields</span>
    <button class="secondary" type="button" name="button" v-on:click="$emit('cancel')">Cancel</button>
    <button class="primary" type="button" name="button" v-on:click="validateBeforeSubmit('addMovie')">Save</button>
  </div>
</form>

<!-- EDIT MOVIE -->

<form
  class="movie-form edit-movie"
  v-on:submit.prevent="validateBeforeSubmit"
  v-else-if="type==='editMovie'"
>
  <div class="cardHead">
    <fieldset class="fieldset-title">
      <input
        type="text"
        name="title"
        v-model="formMovie.title"
        v-validate="'required'"
        :class="{ 'invalid': errors.has(`edit${this.movieId}.title`)}"
        placeholder="Title"
        :data-vv-scope="`edit${this.movieId}`"
      >
      <span
        v-if="errors.has(`edit${this.movieId}.title`)"
        class="invalid"
      >{{ errors.first(`edit${this.movieId}.title`) }}</span>
    </fieldset>
    <fieldset class="fieldset-year">
      <input
        type="number"
        name="year"
        v-model="formMovie.year"
        min="1988"
        v-validate="'required|max_value:2030'"
        data-vv-validate-on="blur|change"
        :class="{'invalid': errors.has(`edit${this.movieId}.year`)}"
        placeholder="Year"
        :data-vv-scope="`edit${this.movieId}`"
      >
      <span
        v-if="errors.has(`edit${this.movieId}.year`)"
        class="invalid"
      >{{ errors.first(`edit${this.movieId}.year`) }}</span>
    </fieldset>
  </div>
  <div class="cardDesc">
    <fieldset>
      <textarea
        name="desc"
        rows="6"
        cols="60"
        v-model="formMovie.desc"
        v-validate="'min:0'"
        :class="{ 'invalid': errors.has(`edit${this.movieId}.desc`) }"
        placeholder="Description"
        :data-vv-scope="`edit${this.movieId}`"
      />
      <span v-if="errors.has(`edit${this.movieId}.desc`)" class="invalid" >{{ errors.first(`edit${this.movieId}.desc`) }}</span>
    </fieldset>
  </div>
  <div class="cardDetails">
    <fieldset>
      <input
        type="number"
        name="length"
        v-model="formMovie.length"
        v-validate="'numeric|min:1'"
        :class="{ 'invalid': errors.has(`edit${this.movieId}.length`) }"
        placeholder="Length (in min)"
        :data-vv-scope="`edit${this.movieId}`"
      >
      <span
        v-if="errors.has(`edit${this.movieId}.length`)"
        class="invalid"
      >{{ errors.first(`edit${this.movieId}.length`) }}</span>
    </fieldset>
  </div>
</form>
</template>

<script>
export default {
  name: 'MovieForm',
  data() {
    return {
      formMovie: {
        title: this.movieData.title,
        year: this.movieData.year,
        length: this.movieData.length,
        desc: this.movieData.desc,
      },
      invalidInput: false
    }
  },
  props: {
    type: String,
    movieId: Number,
    movieData: Object,
  },
  methods: {
    validateBeforeSubmit( scope ) {
      this.$validator.validateAll( scope )
        .then( ( result ) => {
          if ( result ) {
            this.emitMovie();
            return;
          }
          this.invalidInput = true;
        } );
    },
    emitMovie() {
      this.$emit( 'addMovie', this.formMovie );
    },
  },
  updated() {
    if ( this.type === "editMovie" ) {
      const enableSaving = ( this.errors.items.length === 0 );
      this.$emit( 'dataEdit', this.formMovie, enableSaving );
    } else {
      if ( this.errors.items.length === 0 && this.invalidInput === true ) {
        this.invalidInput = false
      }
    }
  },
}
</script>

<style lang="css" scoped>
.movie-form {
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: hsla(265, 100%, 99.2%, 0.7);
  /* background: linear-gradient(180deg, hsla(265, 100%, 95%, 1) 5%, hsla(265, 100%, 99.2%, 0.45) 30%, hsla(265, 100%, 99.2%, 0.45) 100%); */
}
.movie-form.adding {
  padding: 1rem 2rem;
  border-radius: 4px;
  /* box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.2); */
  border: 2px solid hsla(265, 100%, 31%, 0.75);
  margin-bottom: 2rem;
}
fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  margin: 0;
}
* {
  width: 100%;
}
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  margin-top: 0.5rem;
}
.buttons span {
  position: absolute;
  padding-top: 0.2rem;
}
button {
  width: auto;
  margin: 0 0.5rem;
}
button:first-child {
  margin-left: 0;
}
button:last-child {
  margin-right: 0;
}
.movie-numbers {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.movie-numbers fieldset {
  width: 48%;
}
span {
  font-size: 0.85rem;
}
fieldset span {
  margin-top: 0.5rem;
}
span.invalid {
  color: red;
}
input, textarea {
  font-family: inherit;
  font-size: 0.9rem;
  border: 2px solid transparent;
  border-radius: 4px;
  background-color: hsla(265, 10%, 87%, 0.6);
  margin: 0.2rem auto 0.1rem;
  box-sizing: border-box;
  padding: 0.3rem;
}
input::placeholder, textarea::placeholder {
  color: hsla(265, 10%, 68%, 1);
}
textarea {
  resize: vertical;
}
input.invalid, textarea.invalid {
  border: 2px solid rgba(220, 70, 70, 1);
}
.cardHead {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
.cardHead fieldset.fieldset-title {
  width: 74%;
}
.cardHead fieldset.fieldset-year {
  width: 22%;
}
</style>
