import Vue from 'vue';
import App from './App.vue';
import store from '@/store';

Vue.config.productionTip = false;

Vue.config.keyCodes.plus = 187;
Vue.config.keyCodes.minus = 189;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
