<template lang="html">
  <header>
    <img src="../assets/movlix-logo.svg" alt="" class="logo">
    <div class="addMovie" @click="$emit('toggleForm')">
      <span v-if="showForm" :class="{'opaque' : showForm}" >
        &times; close form
      </span>
      <span v-else :class="{'opaque' : showForm}" >
        &plus; add movie
      </span>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    showForm: Boolean
  }
}
</script>

<style lang="css" scoped>
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1.75rem 2rem;
    color: white;
    font-size: 2rem;
    font-weight: lighter;
    background: linear-gradient(130deg, hsla(265, 100%, 28%, 0.99) 42%, hsla(245, 100%, 28%, 0.85) 100%);
    box-sizing: border-box;
  }
  .logo {
    height: 40px;
    opacity: 0.85;
    transform: translateY(0.2rem);
  }
  .addMovie {
    position: relative;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.13rem;
  }
  .addMovie::after {
    content: '';
    width: 100vw;
    height: 1px;
    display: block;
    position: absolute;
    right: -0.5rem;
    background-color: #fff;
    opacity: 0.5;
  }
  .addMovie:hover {
    cursor: pointer;
  }
  .opaque {
    opacity: 0.5;
  }

</style>
