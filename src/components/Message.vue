<template>
  <div class="row" :class="{draft: isDraft}">

    <div class="meta link" v-if="isPrepayPanel" @click="showPayPanel">
      🛒 Pay to publish
    </div>

    <div class="meta" v-if="isInfoPanel">
      <div class="item">💎 {{ formattedBalance }}</div>
      <div class="item">🦸 {{ message.count }}</div>
      <div @click="showPayPanel" class="item link">⬆️ Up</div>
    </div>

    <div class="meta" v-if="isPayPanel">
      <div @click="pay({message, amount: 0.5})" class="item link">💎 0.5</div>
      <div @click="pay({message, amount: 1})" class="item link">💎 1</div>
      <div @click="pay({message, amount: 10})" class="item link">💎 10</div>
      <div @click="pay({message, amount: 100})" class="item link">💎 100</div>
      <div @click="showInfoPanel" class="item link">❌️</div>
    </div>

    <div class="message" v-html="protectedHtml"></div>

    <div class="last_up_at">{{ formattedDate }}</div>

  </div>
</template>

<script>
import numberFormat from "@/app/utils/numberFormat";
import protectHtml from "@/app/utils/protectHtml";
import {mapActions} from "vuex";
import lang from "@/app/lang/lang";
import {MESSAGE_PANEL_INFO, MESSAGE_PANEL_PAY, MESSAGE_TYPE_DRAFT, MESSAGE_TYPE_POST} from "@/app/utils/consts";

export default {
  props: [
    'message',
    'type',
  ],
  data() {
    return {
      panel: MESSAGE_PANEL_INFO
    };
  },
  computed: {
    isDraft() {
      return this.type === MESSAGE_TYPE_DRAFT;
    },

    isPrepayPanel() {
      return this.type === MESSAGE_TYPE_DRAFT && this.panel === MESSAGE_PANEL_INFO;
    },

    isInfoPanel() {
      return this.type === MESSAGE_TYPE_POST && this.panel === MESSAGE_PANEL_INFO;
    },

    isPayPanel() {
      return this.panel === MESSAGE_PANEL_PAY;
    },

    formattedBalance() {
      return numberFormat(this.message.balance, 2);
    },

    protectedHtml() {
      return protectHtml(this.message.message);
    },

    formattedDate() {
      return lang.formatMessageDate(this.message.lastPayAt);
    }
  },
  methods: {
    ...mapActions([
      'pay'
    ]),

    showPayPanel() {
      this.panel = MESSAGE_PANEL_PAY;
    },

    showInfoPanel() {
      this.panel = MESSAGE_PANEL_INFO;
    }
  }
}
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 25px 25px 15px 25px;
  font-size: 1.5rem;
  border-radius: 3px;

  background-color: var(--background);
  margin-bottom: 25px;

  box-shadow: 1px 1px 0 1px rgba(0, 0, 0, .1);
}

.draft {
  background-color: var(--color6);
  box-shadow: 1px 1px 0 1px var(--color7);
}

.row:hover > .meta {
  opacity: 1;
}

.meta {
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;
  line-height: 1.4;
  background-color: #fff;
  color: var(--dark);
  padding: 3px 10px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px #fff;
  transition: .15s linear all;
  opacity: 0.75;
}

.link {
  cursor: pointer;
  opacity: 1;
}

.item {
  margin-right: 20px;
  font-weight: bold;
}

.item:last-child {
  margin-right: 0;
}

.message {
  font-size: 1.5rem;
  line-height: 1.6;
  margin-top: 10px;
  border-radius: 3px;
  color: var(--dark);
}

.message > a {
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--color4);
  text-decoration: underline;
  transition: .1s linear color;
}

.message > a:hover {
  color: var(--color3);
}

.last_up_at {
  display: flex;
  margin-left: auto;
  margin-top: 15px;
  justify-content: flex-end;
  align-items: flex-end;
  justify-items: flex-end;
  color: var(--gray);
  font-size: .8rem;
  line-height: 1;
  font-weight: 400;
}

@media (hover: none) and (pointer: coarse) {
  .row {
    padding: 15px;
  }

  .meta {
    background-color: #fff;
    transition: none;
    opacity: 1;
    justify-items: center;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
