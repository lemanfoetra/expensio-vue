import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';

// IMPORT TABLER TEMPLATE
import '@tabler/core/dist/css/tabler.css';
import '@tabler/core/dist/js/tabler.js';
import 'cal-heatmap/cal-heatmap.css'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
