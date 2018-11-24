<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>A Vue.js app</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    text-align: center;
  }
</style>
