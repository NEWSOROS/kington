<template>
  <div class="container">
    <label class="label" for="message">
      <span class="brand">kington</span>
      <span class="description">Extraton extension demo</span>
    </label>

    <div class="form">
      <div @click="addDraft" class="add">🚀 add</div>
      <textarea @input="changeFormMessage" placeholder="Write your public message" id="message" class="textarea"
                ref="message" v-model="formMessage"></textarea>
    </div>
    <div v-if="helper.message" class="helper" :class="helperClass">{{ helper.message }}</div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {HELPER_TYPE_ERROR} from "@/app/utils/consts";

export default {
  computed: {
    ...mapState([
      'formMessage',
      'helper'
    ]),
    helperClass() {
      switch (this.helper.type) {
        case HELPER_TYPE_ERROR:
          return 'theme_error';
        default:
          return 'theme_info';
      }
    }
  },
  methods: {
    ...mapActions([
      'addDraft',
      'changeFormMessage'
    ])
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto 25px auto;
  padding: 0 15px;
}

.form {
  position: relative;
  display: flex;
  justify-items: stretch;
  align-items: stretch;
  justify-content: stretch;
}

.textarea {
  display: flex;
  padding: 25px 50px 25px 25px;
  flex: 1 0;
  font-size: 1.5rem;
  outline: none;
  border: 2px solid var(--dark);
  border-radius: 0 5px 0 0;
  resize: none;
  font-weight: 400;
}

.add {
  color: var(--dark);
  padding: 3px 15px;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1.4;
  position: absolute;
  bottom: 15px;
  right: 15px;
  border-radius: 3px;
  transition: .1s linear background-color;
}

.add:hover {
  background-color: var(--background);
}

.label {
  display: flex;
  cursor: pointer;
  align-items: center;
}

.brand {
  background-color: var(--dark);
  color: #fff;
  padding: 8px 15px;
  border-radius: 5px 5px 0 0;
  font-size: 1rem;
  line-height: 1;
}

.description {
  color: var(--gray);
  font-size: 1rem;
  line-height: 1;
  margin-left: 10px;
}

.helper {
  background-color: var(--dark);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1;
  padding: 8px 10px 10px 10px;
  display: flex;
  justify-content: center;
  border-radius: 0 0 5px 5px;
}

.theme_error {
  color: var(--color5);
}

.theme_info {
  color: #fff;
}
</style>
