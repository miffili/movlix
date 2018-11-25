import Vue from 'vue'
import App from './App.vue'
import VeeValidate, { Validator } from 'vee-validate'

Vue.config.productionTip = false
Vue.use(VeeValidate, {
  events: "blur|input"
});

const dict = {
  custom: {
    title: {
      required: () => 'Title cannot be empty.'
    },
    year: {
      required: () => 'Year cannot be empty.',
      min_value: () => 'The first movie was made in 1888. 🙂 (Year must be 1888 or later)',
      max_value: () => 'Noone can look this far into the future. 🙂 (Year must be 2030 or earlier)'
    },
    length: {
      numeric: () => 'Length doesn\'t accept decimals.'
    }
  }
}

Validator.localize('en', dict);

new Vue({
  render: h => h(App),
}).$mount('#app')
