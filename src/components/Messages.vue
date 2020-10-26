<template>
  <section class="rows">
    <Message v-for="message in drafts" :key="message" :message="message" type="draft"/>
    <div class="alert" v-if="loading">loading messages from blockchain...</div>
    <Message v-else v-for="message in messages" :key="message" :message="message" type="post"/>

    <div class="alert" v-if="!loading && messages.length === 0">no messages</div>
  </section>
</template>

<script>
import Message from "@/components/Message";
import {mapState} from "vuex";

export default {
  components: {
    Message,
  },
  computed: {
    ...mapState([
      'drafts',
      'messages',
      'loading'
    ])
  },
}
</script>

<style>
.rows {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
}

.alert {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 4;
  color: var(--dark);
  font-weight: 600;
}
</style>
