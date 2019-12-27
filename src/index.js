import Vue from 'vue'
import Vuedraggable from 'vuedraggable'
import App from './App.vue'

Vue.component('draggable', Vuedraggable)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
