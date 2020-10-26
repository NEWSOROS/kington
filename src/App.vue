<template>
  <div :class="{relative: waiting}">
    <Overlay v-if="waiting"/>
    <Header/>
    <div v-if="isAppReady">
      <Form/>
      <Tabs/>
      <Messages/>
      <Footer/>
    </div>
    <Install v-else/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Install from "@/components/Install";
import Messages from "@/components/Messages";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Tabs from "@/components/Tabs";
import Overlay from "@/components/Overlay";
import store from "@/store/index";
import {mapGetters, mapState} from "vuex";

export default {
  components: {
    Messages,
    Header,
    Footer,
    Form,
    Install,
    Tabs,
    Overlay,
  },
  beforeCreate() {
    store.dispatch('init');
  },
  computed: {
    ...mapState([
      'waiting'
    ]),
    ...mapGetters([
      'isAppReady'
    ])
  }
}
</script>

<style>
:root {
  --dark: #000;
  --background: #1b1f230d;
  --gray: #666;
  --color1: #64278C;
  --color2: #8C5637;
  --color3: #BF8F73;
  --color4: #BF5349;
  --color5: #f85050;
  --color6: #fff4c8;
  --color7: #ffef9c;
  --font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: var(--font-family);
  font-size: 1rem;
  line-height: 1.4;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  background-color: #fff;
}

.relative {
  position: fixed;
  width: 100%;
}
</style>
