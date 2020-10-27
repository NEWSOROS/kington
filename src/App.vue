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
  mounted() {
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
  --white: #fff;
  --dark: #000;
  --background: #f3f4f4;
  --gray: #666;
  --gold: #edc100;
  --color-blue: #5185c1;
  --color-green: #709e63;
  --color-red: #ff5f33;
  --font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.4;
  font-family: var(--font-family);
  color: var(--dark);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--white);
}

.relative {
  position: fixed;
  width: 100%;
}
</style>
