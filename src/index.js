import './styles/common.css';
import Vue from 'vue';
import VueRouter from 'vue-router';

const App = () => import(/* webpackChunkName: "app" */ './App.vue');

Vue.config.productionTip = false;
Vue.use(VueRouter);

const Bar = { template: '<div>test-route-1</div>' }

const routes = [
  { path: '/', component: App },
  { path: '/test-route-1', component: Bar }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router
}).$mount('#app');
