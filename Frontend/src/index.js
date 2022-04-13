import { createApp } from 'vue';
import App from './App.vue';
import store from './Store';
import createVueRouter from "./Router";

import './styles/main.styl'

createApp(App)
  .use(store)
  .use(createVueRouter(store))
  .mount('#app');
