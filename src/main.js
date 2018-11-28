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
      min_value: () => 'Year must be 1888 or later',
      max_value: () => 'Year must be 2030 or earlier'
    },
    length: {
      numeric: () => 'Length cannot have decimals.',
      min_value: () => 'Minimum length is 1 minute.'
    }
  }
}

Validator.localize('en', dict);

new Vue({
  render: h => h(App),
}).$mount('#app')
