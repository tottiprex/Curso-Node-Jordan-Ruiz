import { createApp } from 'vue';
import 'virtual:uno.css';
import '@unocss/reset/tailwind-compat.css';
import { router } from './router';
import App from './App.vue';

createApp(App).use(router).mount('#app');

