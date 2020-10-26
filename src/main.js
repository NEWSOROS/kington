import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import VueTippy, {TippyComponent} from "vue-tippy";
// Add additional themes.
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";

const app = createApp(App);
app.use(store);
app.use(VueTippy, {
  directive: "tippy", // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }
});
app.component("tippy", TippyComponent);
app.mount('#app');

