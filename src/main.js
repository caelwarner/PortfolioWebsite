import Vue from 'vue'
import App from './App.vue'
import loading from 'vuejs-loading-screen'

Vue.config.productionTip = false

Vue.use(loading, {
  bg: '#03020BFF',
  icon: 'refresh',
  size: 3,
  icon_color: 'white',
});

new Vue({
  render: h => h(App),
}).$mount('#app')

