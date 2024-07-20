import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';

// IMPORT TABLER TEMPLATE
import '@tabler/core/dist/css/tabler.css';
import '@tabler/core/dist/js/tabler.js';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
