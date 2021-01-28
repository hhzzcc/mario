import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { init } from './init';

Vue.config.productionTip = false;

init();

new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app');
