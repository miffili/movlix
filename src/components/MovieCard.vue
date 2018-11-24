<template>
<div class="movieCard">
  <h3>{{ movieData.title }}</h3>
  <div class="movieDetails">
    <p>{{ movieData.year }}</p>
    <p><em>{{ movieData.length }} min</em></p>
    <p>{{ movieData.rating }} / 5</p>
  </div>
  <p v-if="movieData.desc">{{ movieData.desc }}</p>
  <p v-else>Good evening, I'm Doctor Emmett Brown. I'm standing on the parking lot of Twin Pines Mall. It's Saturday morning, October 26, 1985, 1:18 a.m. and this is temporal experiment number one. C'mon, Einy, hey hey boy, get in there, that a boy, in you go, get down, that's it. Doc, wait. No, bastards. But you're good, Marty, you're really good. And this audition tape of your is great, you gotta send it in to the record company. It's like Doc's always saying. Well, what if they didn't like them, what if they told me I was no good. I guess that would be pretty hard for somebody to understand. Are you gonna order something, kid?</p>
  <div class="functions">
    <button type="button" name="remove" v-on:click="$emit('remove', $event.target)">Remove</button>
    <button type="button" name="edit" v-on:click="toggleForm">Edit</button>
  </div>
  <MovieForm v-if="showForm" type="edit" :movieData="movieData" v-on:updateMovie="toggleForm"/>
</div>
</template>

<script>
import MovieForm from './MovieForm.vue'

export default {
  name: 'MovieCard',
  data: () => ({
    showForm: false,
  }),
  props: {
    movieData: {
      id: Number,
      title: String,
      year: Number,
      length: Number,
      rating: Number,
      desc: String
    }
  },
  components: {
    MovieForm
  },
  methods: {
    toggleForm: function() {
      this.showForm = !this.showForm
    }
  }
}
</script>

<style lang="css" scoped>
  .movieCard {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60vw;
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: .25rem .25rem 1rem 0 hsla(0, 0%, 0%, 0.1);
    background-color: white;
    margin-bottom: 1rem;
    box-sizing: border-box;
  }
  .movieCard:hover {
    transform: scale(1.05);
  }
  .movieDetails {
    display: flex;
    align-items: flex-start;
    padding: 0;
  }
  .movieDetails p {
    padding: 0 1rem;
    margin: 0;
    border-right: solid 1px black;
  }
  .movieDetails p:first-child {
    padding-left: 0;
  }
  .movieDetails p:last-child {
    padding-right: 0;
    border-right: none;
  }
  .functions button:first-child {
    margin-right: 0.5rem;
  }
  .movieCard .movieForm {
    margin: 1rem 0;
    width: 100%;
  }
</style>
