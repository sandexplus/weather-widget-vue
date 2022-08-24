import Vue from 'vue'
import App from './App.vue'

import WeatherWidget from '@/components/WeatherWidget'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App)
})

Vue.component('weather-widget', WeatherWidget)

app.$mount('#app')
