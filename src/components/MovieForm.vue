<template>
<!-- ADD MOVIE -->
<form
  v-if="type==='addMovie'"
  :key="'newMovie'"
  class="movie-form adding"
>
  <fieldset>
    <h3>Add Movie</h3>
  </fieldset>
  <fieldset>
    <label for="title">Title <span class="required">*</span></label>
    <input
      type="text"
      name="title"
      v-focus
      v-model="formMovie.title"
      v-validate="'required'"
      data-vv-scope="addMovie"
      :class="{ 'invalid': errors.has('addMovie.title')}"
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
        min="1988"
        v-model="formMovie.year"
        v-validate="'required|max_value:2030'"
        data-vv-validate-on="blur|change"
        data-vv-scope="addMovie"
        :class="{ 'invalid': errors.has('addMovie.year')}"
      >
      <span
        v-if="errors.has('addMovie.year')"
        class="invalid"
      >
        {{ errors.first('addMovie.year') }}
      </span>
    </fieldset>
    <fieldset>
      <label for="length">Length (in min)</label>
      <input
        type="number"
        name="length"
        v-model="formMovie.length"
        v-validate="'numeric|min:1|min_value:1'"
        data-vv-scope="addMovie"
        :class="{ 'invalid': errors.has('addMovie.length')}"
      >
      <span
        v-if="errors.has('addMovie.length')"
        class="invalid"
      >
        {{ errors.first('addMovie.length') }}
      </span>
    </fieldset>
  </div>
  <fieldset>
    <label for="desc">Description</label>
    <textarea
      name="desc"
      rows="5"
      cols="60"
      v-model="formMovie.desc"
      v-validate="'min:0'"
      data-vv-scope="addMovie"
      :class="{ 'invalid': errors.has('addMovie.desc') }"
    />
    <span
      v-if="errors.has('addMovie.desc')"
      class="invalid"
    >
      {{ errors.first('addMovie.desc') }}
    </span>
  </fieldset>
  <div v-if="type==='addMovie'" class="buttons">
    <span v-if="invalidInput" class="invalid" >Please correct the errors.</span>
    <span v-else class="info" >* required fields</span>
    <button type="button" name="button" v-on:click="$emit('cancel')" class="secondary">Cancel</button>
    <button type="button" name="button" v-on:click="validateBeforeSubmit('addMovie')" class="primary">Save</button>
  </div>
</form>

<!-- EDIT MOVIE -->

<form
  v-else-if="type==='editMovie'"
  v-on:submit.prevent="validateBeforeSubmit"
  class="movie-form edit-movie"
>
  <div class="card-head">
    <fieldset class="fieldset-title">
      <input
        type="text"
        name="title"
        placeholder="Title"
        v-focus
        v-model="formMovie.title"
        v-validate="'required'"
        :data-vv-scope="`edit${movieData.id}`"
        :class="{ 'invalid': errors.has(`edit${movieData.id}.title`)}"
      >
      <span
        v-if="errors.has(`edit${movieData.id}.title`)"
        class="invalid"
      >
        {{ errors.first(`edit${movieData.id}.title`) }}
      </span>
    </fieldset>
    <fieldset class="fieldset-year">
      <input
        type="number"
        name="year"
        placeholder="Year"
        min="1988"
        v-model="formMovie.year"
        v-validate="'required|max_value:2030'"
        data-vv-validate-on="blur|change"
        :data-vv-scope="`edit${movieData.id}`"
        :class="{'invalid': errors.has(`edit${movieData.id}.year`)}"
      >
      <span
        v-if="errors.has(`edit${movieData.id}.year`)"
        class="invalid"
      >
        {{ errors.first(`edit${movieData.id}.year`) }}
      </span>
    </fieldset>
  </div>
  <div class="cardDesc">
    <fieldset>
      <textarea
        name="desc"
        placeholder="Description"
        rows="4"
        v-model="formMovie.desc"
        v-validate="'min:0'"
        :data-vv-scope="`edit${movieData.id}`"
        :class="{ 'invalid': errors.has(`edit${movieData.id}.desc`) }"
      />
      <span v-if="errors.has(`edit${movieData.id}.desc`)" class="invalid" >{{ errors.first(`edit${movieData.id}.desc`) }}</span>
    </fieldset>
  </div>
  <div class="card-details">
    <fieldset>
      <input
        type="number"
        name="length"
        placeholder="Length (in min)"
        v-model="formMovie.length"
        v-validate="'numeric|min:1|min_value:1'"
        :data-vv-scope="`edit${movieData.id}`"
        :class="{ 'invalid': errors.has(`edit${movieData.id}.length`) }"
      >
      <span
        v-if="errors.has(`edit${movieData.id}.length`)"
        class="invalid"
      >{{ errors.first(`edit${movieData.id}.length`) }}</span>
    </fieldset>
  </div>
</form>
</template>

<script>
export default {
  name: 'MovieForm',
  directives: {
    focus: {
      inserted: function( el ) {
        el.focus()
      }
    }
  },
  props: {
    type: String,
    movieData: {
      id: Number,
      title: String,
      year: Number,
      length: Number,
      desc: String
    },
  },
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
}
</script>

<style lang="css" scoped>
.movie-form {
  width: 100%;
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
  color: hsla(0, 100%, 37%, 0.8);
}
input, textarea {
  font-family: inherit;
  font-size: 0.9rem;
  border: 2px solid transparent;
  border-radius: 4px;
  background-color: hsla(265, 10%, 87%, 0.6);
  margin: 0.2rem auto 0.1rem;
  box-sizing: border-box;
  padding: 0.2rem;
}
input::placeholder, textarea::placeholder {
  color: hsla(265, 10%, 68%, 1);
}
textarea {
  resize: vertical;
}
input.invalid, textarea.invalid {
  border: 2px solid hsla(0, 100%, 31%, 0.8);
}
.edit-movie fieldset {
  padding-bottom: 0;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
.card-head fieldset {
  width: 48%;
}
.card-details fieldset {
  width: 48%;
}
</style>
