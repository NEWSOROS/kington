<template>
  <div class="tabs">
    <div @click="setSortByBalance" class="tab" :class="{theme_selected: isSortByBalance}">sort by balance
    </div>
    <div @click="setSortByLastUp" class="tab" :class="{theme_selected: isSortByLastUp}">sort by last up
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {SORT_BY_BALANCE, SORT_BY_LAST_UP} from "@/app/utils/consts";

export default {
  methods: {
    ...mapActions([
      'changeSortBy'
    ]),
    setSortByBalance() {
      this.changeSortBy(SORT_BY_BALANCE);
    },
    setSortByLastUp() {
      this.changeSortBy(SORT_BY_LAST_UP);
    },
  },
  computed: {
    ...mapState([
      'sortType'
    ]),
    isSortByBalance() {
      return this.sortType === SORT_BY_BALANCE;
    },
    isSortByLastUp() {
      return this.sortType === SORT_BY_LAST_UP;
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  justify-items: center;
  justify-content: center;
  max-width: 670px;
  margin: 0 auto 25px auto;
  background-color: var(--background);
  border-radius: 5px;
}

.tab {
  display: flex;
  flex: 1;
  font-size: 1rem;
  line-height: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
  justify-items: center;
  color: var(--dark);
  font-weight: 400;
  cursor: pointer;
  border: 2px solid transparent;
}

.theme_selected {
  border: 2px solid var(--dark);
  font-weight: 600;
  border-radius: 5px;
  background-color: #fff;
}

</style>
