<template lang="html">
  <header>
    <a href="#" class="">
      🎥 movlix
    </a>
    <div class="addMovie" v-on:click="$emit('toggleForm')">
      &plus; add movie
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style lang="css" scoped>
  header {
    margin: 0;
    padding: 2rem 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: white;
    background-color: hsla(265, 100%, 31%, 1);
    font-size: 2rem;
    font-weight: lighter;
    box-sizing: border-box;
  }
  .addMovie {
    font-size: 1.5rem;
  }
  .addMovie:hover {
    cursor: pointer;
  }

</style>
