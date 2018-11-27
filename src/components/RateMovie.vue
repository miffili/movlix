<template lang="html">
  <div class="rating">
  <ul class="list">
    <li v-for="(star, index) in zeroBasedMax" v-on:click="rate(index)" :key="`star${index}`" :class="{ 'active': index <= stars}" class="star">
      <svg viewBox="5 5 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path d="M41.4168 9.59894L48.4753 29.9053C48.8187 30.893 49.7404 31.5627 50.7858 31.584L72.2795 32.022C73.7014 32.051 74.2885 33.8578 73.1552 34.717L56.0239 47.705C55.1906 48.3368 54.8385 49.4203 55.1413 50.4212L61.3667 70.9982C61.7785 72.3595 60.2415 73.4762 59.0742 72.6638L41.428 60.3845C40.5697 59.7873 39.4303 59.7873 38.572 60.3845L20.9258 72.6638C19.7585 73.4762 18.2215 72.3595 18.6333 70.9982L24.8587 50.4212C25.1615 49.4203 24.8094 48.3368 23.9761 47.705L6.84482 34.717C5.71152 33.8578 6.29859 32.051 7.72048 32.022L29.2142 31.584C30.2596 31.5627 31.1813 30.893 31.5247 29.9053L38.5832 9.59895C39.0501 8.2556 40.9499 8.2556 41.4168 9.59894Z" />
        </g>
      </svg>
    </li>
  </ul>
  <span v-if="hasCounter" class="counter">{{ stars }} / {{ maxStars }}</span>
</div>
</template>

<script>
export default {
  data() {
    return {
      stars: this.grade,
    }
  },
  props: {
    grade: Number,
    maxStars: Number,
    hasCounter: Boolean,
  },
  methods: {
    rate(star) {
      if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
        this.stars = star
      }
    }
  },
  watch: {
    stars: function() {

    }
  },
  computed: {
    zeroBasedMax: function() {
      return this.maxStars + 1;
    }
  }
}
</script>

<style lang="css" scoped>
  .rating {
    display: flex;
    align-items: center;
  }
  .list {
    list-style-type: none;
    padding: 0 0.25rem;
    display: flex;
    margin: 0;
    position: relative;
  }
  .list:hover .star svg {
    fill: goldenrod;
  }
  .star:first-child {
    width: 0.5rem;
    opacity: 0;
    position: absolute;
    left: 0;
  }
  .star {
    cursor: pointer;
    width: 1rem;
  }
  .star:hover svg {
    fill: goldenrod;
  }
  .star:hover ~ .star:not(.active) svg{
    fill: grey;
  }
  .star svg {
    width: 100%;
    fill: grey;
  }
  .active svg {
    fill: goldenrod;
  }
  .counter {
    padding-left: 0.25rem;
  }
</style>
