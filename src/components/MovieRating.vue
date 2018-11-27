<template lang="html">
  <div v-if="rated" class="rating">
  <ul class="list">
    <li v-for="(star, index) in zeroBasedMax" v-on:click="rate(index)" :key="`star${index}`" :class="{ 'active': index <= stars}" class="star">
      <svg viewBox="5 5 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path d="M41.4168 9.59894L48.4753 29.9053C48.8187 30.893 49.7404 31.5627 50.7858 31.584L72.2795 32.022C73.7014 32.051 74.2885 33.8578 73.1552 34.717L56.0239 47.705C55.1906 48.3368 54.8385 49.4203 55.1413 50.4212L61.3667 70.9982C61.7785 72.3595 60.2415 73.4762 59.0742 72.6638L41.428 60.3845C40.5697 59.7873 39.4303 59.7873 38.572 60.3845L20.9258 72.6638C19.7585 73.4762 18.2215 72.3595 18.6333 70.9982L24.8587 50.4212C25.1615 49.4203 24.8094 48.3368 23.9761 47.705L6.84482 34.717C5.71152 33.8578 6.29859 32.051 7.72048 32.022L29.2142 31.584C30.2596 31.5627 31.1813 30.893 31.5247 29.9053L38.5832 9.59895C39.0501 8.2556 40.9499 8.2556 41.4168 9.59894Z" />
        </g>
      </svg>
    </li>
  </ul>
  <span v-if="this.stars >= 0" class="counter">{{ stars }}<span class="ofMax">/{{ maxStars }}</span></span>
</div>
<div v-else class="rating" :class="{'not-rated': !rated}" v-on:click="enableRating">
  <svg viewBox="5 5 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
      <path d="M41.4168 9.59894L48.4753 29.9053C48.8187 30.893 49.7404 31.5627 50.7858 31.584L72.2795 32.022C73.7014 32.051 74.2885 33.8578 73.1552 34.717L56.0239 47.705C55.1906 48.3368 54.8385 49.4203 55.1413 50.4212L61.3667 70.9982C61.7785 72.3595 60.2415 73.4762 59.0742 72.6638L41.428 60.3845C40.5697 59.7873 39.4303 59.7873 38.572 60.3845L20.9258 72.6638C19.7585 73.4762 18.2215 72.3595 18.6333 70.9982L24.8587 50.4212C25.1615 49.4203 24.8094 48.3368 23.9761 47.705L6.84482 34.717C5.71152 33.8578 6.29859 32.051 7.72048 32.022L29.2142 31.584C30.2596 31.5627 31.1813 30.893 31.5247 29.9053L38.5832 9.59895C39.0501 8.2556 40.9499 8.2556 41.4168 9.59894Z" />
    </g>
  </svg>
  <span class="cta">rate now</span>
</div>
</template>

<script>
import {
  EventBus
} from '../Events.js'

export default {
  props: {
    grade: Number,
    movieId: [ Number, String ]
  },
  data() {
    return {
      stars: this.grade,
      maxStars: 5
    }
  },
  computed: {
    zeroBasedMax: function() {
      return this.maxStars + 1
    },
    rated: function() {
      return !isNaN( this.stars )
    }
  },
  methods: {
    rate( star ) {
      if ( typeof star === 'number' && star <= this.maxStars && star >= 0 ) {
        this.stars = star
      }
    },
    enableRating() {
      this.stars = 0
    }
  },
  watch: {
    stars: function() {
      EventBus.$emit( 'updateRating', this.stars, this.movieId )
    }
  },
}
</script>

<style lang="css" scoped>
  .rating {
    display: flex;
    align-items: center;
    height: 1.2rem;
  }
  .list {
    list-style-type: none;
    padding: 0 0.25rem;
    display: flex;
    margin: 0;
    position: relative;
  }
  /* when hovering over rating (all stars up til cursor) */
  .list:hover .star svg {
    stroke: hsla(46, 65%, 50%, 1);
    fill: hsla(46, 92%, 64%, 0.5);
  }
  .list:hover ~ .counter {
    opacity: 1;
  }
  .counter {
    padding-left: 0.25rem;
    font-size: 1rem;
    letter-spacing: 0.08rem;
    opacity: 0;
  }
  .ofMax {
    font-size: 0.7rem;
  }
  .star {
    cursor: pointer;
    width: 1rem;
  }
  .star:first-child {
    width: 0.5rem;
    opacity: 0;
    position: absolute;
    left: 0;
  }
  .star:hover svg {
    stroke: hsla(46, 65%, 50%, 1) !important;
    fill: hsla(46, 92%, 70%, 1) !important;
  }
  .star:hover ~ .star svg {
    stroke: hsla(0, 0%, 32%, 0.5);
    fill: hsla(0, 0%, 32%, 0.3);
  }
  /* when hovering over rating all after cursor */
  .star:hover ~ .star:not(.active) svg{
    stroke: hsla(0, 0%, 32%, 0.5);
    fill: hsla(0, 0%, 32%, 0.3);
  }
  /* when rated all chosen */
  .active svg {
    stroke: hsla(46, 65%, 50%, 1);
    fill: hsla(46, 92%, 64%, 1);
  }
  /* when rated all none chosen */
  .star:not(.active) svg {
    stroke: hsla(0, 0%, 32%, 0.5);
    fill: hsla(0, 0%, 32%, 0.5);
  }
  /* RATE CTA */
  .not-rated {
    display: flex;
    height: 1.2rem;
    align-items: flex-start;
    cursor: default;
    padding-left: 0.75rem;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
  .not-rated svg {
    width: 1rem;
    height: 1rem;
    fill: goldenrod;
    margin-right: 0.15rem;
    opacity: 0.5;
  }
  .cta {
    align-self: center;
  }
</style>
