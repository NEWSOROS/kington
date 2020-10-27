import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import VTooltip from 'v-tooltip'

const app = createApp(App);
app.use(store);
app.use(VTooltip);
app.mount('#app');
