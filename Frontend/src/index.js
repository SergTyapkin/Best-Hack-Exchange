import { createApp } from 'vue';
import App from './App.vue';
import store from './Store';
import createVueRouter from "./Router";

import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy'
import FusionTheme from './fusion-theme.js'

import './styles/scrollbars.styl'
import './styles/main.styl'
import './styles/forms.styl'


//The `FusionCharts.register()` API is used to register the new theme in the FusionCharts core.
FusionCharts.register('theme', FusionTheme);

createApp(App)
  .use(store)
  .use(createVueRouter(store))
  .use(VueFusionCharts, FusionCharts, Charts)
  .mount('#app');
