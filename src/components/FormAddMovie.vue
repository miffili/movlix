<template>
<form
  class="movieForm"
  v-on:submit.prevent="validateBeforeSubmit"
>
  <fieldset>
    <h3>Add Movie</h3>
  </fieldset>
  <fieldset>
    <label for="title">Title</label>
    <input
      type="text"
      name="title"
      v-model="title"
      v-validate="'required'"
      :class="{ 'valid': titleValid, 'invalid': errors.has('title') && this.fields['title'].validated}"
    >
    <span
      v-if="errors.has('title')"
      class="invalid"
    >{{ errors.first('title') }}</span>
  </fieldset>
  <div class="movieNumbers">
    <fieldset>
      <label for="year">Year</label>
      <input
        type="number"
        name="year"
        v-model="year"
        min="1988"
        v-validate="'required|max_value:2030'"
        data-vv-validate-on="blur|change"
        :class="{ 'valid': yearValid, 'invalid': errors.has('year') && this.fields['year'].validated}"
      >
      <span
        v-if="errors.has('year')"
        class="invalid"
      >{{ errors.first('year') }}</span>
    </fieldset>
    <fieldset>
      <label for="length">Length (in min)</label>
      <input
        type="number"
        name="length"
        v-model="length"
        v-validate="'numeric|min:1'"
        :class="{ 'valid': lengthValid, 'invalid': errors.has('length') && this.fields['length'].validated}"
      >
      <span
        v-if="errors.has('length')"
        class="invalid"
      >{{ errors.first('length') }}</span>
    </fieldset>
  </div>
  <fieldset>
    <label for="desc">Description</label>
    <textarea
      name="desc"
      rows="6"
      cols="60"
      v-model="desc"
      v-validate="'min:0'"
      :class="{ 'valid': descValid, 'invalid': errors.has('desc') && this.fields['desc'].validated}"
    />
    <span v-if="errors.has('desc')" class="invalid" >{{ errors.first('desc') }}</span>
  </fieldset>
  <div class="buttons">
    <span v-show="this.errors.items.length > 0" class="invalid" >Please correct the errors.</span>
    <button class="secondary" type="button" name="button" v-on:click="$emit('cancel')">Cancel</button>
    <button class="primary" type="submit" name="button">Save</button>
  </div>
</form>
</template>

<script>
export default {
  name: 'MovieForm',
  data: function() {
    return {
      title: this.movieData.title,
      year: this.movieData.year,
      length: this.movieData.length,
      desc: this.movieData.desc,
      // formInvalid: false,
    }
  },
  props: {
    type: String,
    movieData: Object,
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.emitMovie();
          return;
        }
        // this.formInvalid = true;
      });
    },
    emitMovie() {
      const formMovie = {
        title: this.title,
        year: this.year,
        length: this.length,
        desc: this.desc
      };
      this.$emit('addMovie', formMovie);
    }
  },
  computed: {
    titleValid: function() {
      return (
        this.fields &&
        this.fields['title'] &&
        this.fields['title'].validated &&
        this.fields['title'].valid
      );
    },
    yearValid: function() {
      return (
        this.fields &&
        this.fields['year'] &&
        this.fields['year'].validated &&
        this.fields['year'].valid
      );
    },
    lengthValid: function() {
      return (
        this.fields &&
        this.fields['length'] &&
        this.fields['length'].changed &&
        this.fields['length'].validated &&
        this.fields['length'].valid
      );
    },
    descValid: function() {
      return (
        this.fields &&
        this.fields['desc'] &&
        this.fields['desc'].changed &&
        this.fields['desc'].validated &&
        this.fields['desc'].valid
      );
    }
  }
}
</script>

<style lang="css" scoped>
.movieForm {
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  /* box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.2); */
  border: 2px solid hsla(265, 100%, 31%, 0.75);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
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
.movieNumbers {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.movieNumbers fieldset {
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
  border: 2px solid transparent;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: 0.2rem auto 0.1rem;
  box-sizing: border-box;
  padding: 0.3rem;
}
textarea {
  resize: vertical;
}
input.valid, textarea.valid {
  border: 2px solid rgba(0, 250, 100, 0.4);
}
input.invalid, textarea.invalid {
  border: 2px solid rgba(220, 70, 70, 1);
}
</style>
