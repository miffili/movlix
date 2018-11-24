<template>
  <div class="movieForm">
    <fieldset>
      <label for="movie-title">Title</label>
      <input type="text" name="movie-title" v-model="movieData.title" placeholder="">
    </fieldset>
    <fieldset>
      <label for="movie-year">Year</label>
      <input type="number" name="movie-year" v-model="movieData.year">
    </fieldset>
    <fieldset>
      <label for="movie-length">Length (in min)</label>
      <input type="number" name="movie-length" v-model="movieData.length">
    </fieldset>
    <fieldset>
      <label for="movie-rating">Rating (of 5)</label>
      <input type="number" name="movie-rating" v-model="movieData.rating">
    </fieldset>
    <fieldset>
      <label for="movie-desc">Description</label>
      <textarea name="movie-desc" rows="6" cols="60" v-model="movieData.desc"></textarea>
    </fieldset>
    <button type="button" name="button" v-on:click="$emit('addMovie')">Add Movie</button>
  </div>
</template>

<script>
export default {
  name: 'MovieForm',
  props: {
    type: String,
    movieData: Object,
  }
}
</script>

<style lang="css" scoped>
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
