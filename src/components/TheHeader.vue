<template lang="html">
  <header>
    <img src="../assets/movlix-logo.svg" alt="" class="logo">
    <div class="underline">
      <button type="button" :name="`${showForm ? 'close' : 'open'} form`" class="no-btn addMovie" @click="$emit('toggleForm')">
        <span v-if="showForm" :class="{'opaque' : showForm}" >
          &times; close form
        </span>
        <span v-else :class="{'opaque' : showForm}" >
          &plus; add movie
        </span>
      </button>
    </div>
  </header>
</template>
<button type="button" name="button"></button>

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
    max-width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.75rem 0.5rem;
    color: white;
    font-size: 2rem;
    font-weight: lighter;
    background: linear-gradient(130deg, hsla(265, 100%, 28%, 0.99) 42%, hsla(245, 100%, 28%, 0.85) 100%);
    box-sizing: border-box;
  }
  .logo {
    height: 2.5rem;
    opacity: 0.85;
    align-self: flex-start;
  }
  .underline {
    position: relative;
    align-self: flex-end;
  }
  .underline::after {
    content: '';
    width: 100vw;
    height: 1px;
    display: block;
    position: absolute;
    right: 0;
    background-color: hsla(0, 100%, 100%, 0.6);
  }
  @media (min-width: 576px) {
    header {
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      padding: 1.75rem 2rem;
    }
    .logo {
      width: auto;
      height: 40px;
      transform: translateY(0.2rem);
      align-self: auto;
    }
    .underline {
      align-self: auto;
    }
  }
  .addMovie {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.13rem;
    color: hsla(265, 10%, 94%, 1);
  }
  .addMovie:hover {
    cursor: pointer;
    text-shadow: 0 0 hsla(265, 10%, 96%, 1);
  }
  .opaque {
    opacity: 0.5;
  }

</style>
