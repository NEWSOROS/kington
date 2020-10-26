<template>
  <div class="container">
    <div class="info">
      <a href="" class="brand">kington</a>
    </div>
    <ol class="ol">
      <li class="li" :class="{done: extensionIsInstalled}">
        install <a href="https://extraton.io/" target="_blank">Extraton Chrome extension</a>
      </li>
      <li class="li" :class="{done: isNetworkReady}">switch to main network of freeton</li>
      <li class="li">write short message and pay to publish</li>
      <li class="li">
        join to Extraton on <a href="https://github.com/extraton/extraton-extension" target="_blank">github</a>
        and <a href="https://t.me/extraton" target="_blank">telegram</a>
      </li>
    </ol>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  computed: {
    ...mapState([
      'extensionIsInstalled'
    ]),
    ...mapGetters([
      'isNetworkReady',
    ])
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto 25px auto;
  padding: 0 15px;
}

.info {
  display: flex;
}

.brand {
  display: flex;
  flex: 1 100%;
  justify-content: center;
  text-decoration: none;
  background-color: var(--dark);
  color: #fff;
  font-size: 1.25rem;
  line-height: 1.5;
  padding: 20px 25px;
  border-radius: 3px;
}

.ol {
  display: flex;
  flex-direction: column;
  margin: 25px 0 0 0;
}

.li {
  font-size: 1.5rem;
  line-height: 2;
  list-style: decimal inside;
  left: 0;
}

.li > a {
  font-size: 1.5rem;
  line-height: 2;
  text-decoration: none;
  color: var(--color1);
}

.done {
  text-decoration: line-through;
  color: var(--color3);
}
</style>
