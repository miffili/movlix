<template>
<div class="movieCard">
  <div v-if="openCard">
    <!-- <div class="cardHead">
      <h3>{{ movieData.title }}</h3>
      <p>{{ movieData.year }}</p>
    </div> -->
    <div class="cardHead">
      <h3><span class="title">{{ movieData.title }}</span><span class="year">{{ movieData.year }}</span></h3>
    </div>
    <div class="cardDesc">
      <p v-if="movieData.desc">{{ movieData.desc }}</p>
      <p v-else><em>Description not provided</em></p>
    </div>
    <div class="cardDetails">
      <p v-if="movieData.length"><em>{{ prettyLength }}</em></p>
      <!-- RATING -->
      <RateMovie :grade="ratingInNumber" :maxStars="5" :hasCounter="true"/>
      <!-- <div v-else>
        movie already rated
      </div> -->
    </div>
    <div class="cardFunctions"
      v-if="openCard">
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
      >Edit</button>
    </div>
  </div>
  <div v-else class="closedCard">
    <div class="cardHead">
      <h3>{{ movieData.title }}</h3>
      <p>{{ movieData.year }}</p>
    </div>
    <div class="cardDesc">
      <p v-if="movieData.desc">{{ movieData.desc }}</p>
      <p v-else><em>Description not provided</em></p>
    </div>
    <div class="cardDetails">
      <p v-if="movieData.length"><em>{{ prettyLength }}</em></p>
      <p v-if="movieData.rating">{{ movieData.rating }} / 5</p>
      <p v-else>no rating yet</p>
      <p v-on:click="toggleOpen">more...</p>
    </div>
  </div>
</div>
</template>

<script>
import RateMovie from './RateMovie.vue'

export default {
  data: function() {
    return {
      openCard: false
    }
  },
  props: {
    movieData: {
      id: Number,
      title: String,
      year: Number,
      length: Number,
      rating: [String, Number],
      desc: String
    }
  },
  methods: {
    toggleOpen: function() {
      this.openCard = !this.openCard
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
      return parseInt(grade);
    }
  },
  components: {
    RateMovie
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
    transform: scale(1.05);
  }
  .movieCard>div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 3rem;
  }
  .movieCard .closedCard {
    padding-bottom: 0rem;
  }
  .cardHead {
    display: flex;
    align-items: baseline;
    max-width: 100%;
  }
  h3 {
    padding-right: 0.5rem;
    font-size: 1.3rem;
  }
  .closedCard h3 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    padding-right: 0.5rem;
  }
  .year {
    opacity: 0.4;
    font-size: 1rem;
    margin: 0;
  }
  .closedCard .cardDesc {
    max-width: 100%;
  }
  .closedCard .cardDesc p {
    padding-right: 0.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .cardDetails {
    display: flex;
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
    /* font-weight: 300; */
  }
</style>
