import { createApp } from 'vue';
import { initStore } from './store.js';

import './style.css';

import App from './App.vue';

const app = createApp(App);

const store = initStore(app);

window.ss = {
  app,
  store,
};

app.mount('#app');
