import {createStore} from 'vuex'
import apiGetMessages from "@/app/api/apiGetMessages";
import apiSendMessage from "@/app/api/apiSendMessage";
import lang from "@/app/lang/lang.js";
import byteLength from "@/app/utils/byteLength";
import {
  DEFAULT_NETWORK_ID,
  HELPER_TYPE_ERROR,
  HELPER_TYPE_INFO,
  MAX_MESSAGE_LENGTH,
  SORT_BY_BALANCE,
  SORT_BY_LAST_UP
} from "@/app/utils/consts";
import sortMessages from "@/app/utils/sortMessages";
import clearText from "@/app/utils/clearText";
import check from "@/app/api/check";

export default createStore({
  state: {
    loading: false,
    waiting: false,
    extensionIsInstalled: false,
    extensionNetworkId: -1,
    helper: {
      message: '',
      type: HELPER_TYPE_INFO,
    },
    formMessage: '',
    sortType: SORT_BY_BALANCE,
    messages: [],
    drafts: []
  },
  getters: {
    isNetworkReady: state => state.extensionNetworkId === DEFAULT_NETWORK_ID,
    isAppReady: (state, getters) => state.extensionIsInstalled && getters.isNetworkReady,
  },
  mutations: {
    startLoading: state => state.loading = true,

    stopLoading: state => state.loading = false,

    startWaiting: state => state.waiting = true,

    stopWaiting: state => state.waiting = false,

    setExtensionIsInstalled: (state, isInstalled) => state.extensionIsInstalled = isInstalled,

    setExtensionNetworkId: (state, networkId) => state.extensionNetworkId = networkId,

    addDraft: (state, message) => state.drafts.unshift({
      message: message,
      balance: 0,
      count: 0
    }),

    removeDraft: (state, message) => state.drafts = state.drafts.filter(draft => draft.message !== message.message),

    resetMessages: (state, messages) => state.messages = messages,

    changePanel(state, payload) {
      payload.message.panel = payload.panel;
    },

    setFormMessage(state, payload) {
      state.formMessage = payload;
    },

    setExtensionError(state, error) {
      state.helper = {
        message: lang.extensionError(error.text),
        type: HELPER_TYPE_ERROR,
      }
    },

    setAppError(state, message) {
      state.helper = {
        message: lang.appError(message),
        type: HELPER_TYPE_ERROR,
      };
    },

    setAppInfo(state, message) {
      state.helper = {
        message,
        type: HELPER_TYPE_INFO,
      };
    },

    clearError(state) {
      state.helper = {
        message: '',
        type: HELPER_TYPE_INFO,
      }
    },

    setSortType(state, sortType) {
      state.sortType = sortType;
    }
  },
  actions: {
    async addDraft({commit, state}) {
      commit('clearError');

      const message = clearText(state.formMessage);

      if (!message) {
        commit('setAppInfo', lang.emptySubmitMessage);

        return;
      }

      if (byteLength(message) > MAX_MESSAGE_LENGTH) {
        commit('setAppInfo', lang.longSubmitMessage);

        return;
      }

      commit('addDraft', message);
      commit('setFormMessage', '');
    },

    async pay({commit, dispatch}, {message, amount}) {
      commit('startWaiting');
      commit('clearError');

      try {
        await apiSendMessage(amount, message.message);
        commit('removeDraft', message);
        commit('setSortType', SORT_BY_LAST_UP);
        dispatch('refreshMessages');
      } catch (e) {
        commit('setExtensionError', e);
      } finally {
        commit('stopWaiting');
      }
    },

    changeFormMessage: ({commit}, e) => {
      commit('clearError');
      commit('setFormMessage', e.target.value);
    },

    async init({commit, getters, dispatch}) {
      const call = async () => {
        commit('clearError');
        commit('setExtensionIsInstalled', await check.isInstalled());
        commit('setExtensionNetworkId', await check.getNetworkId());

        if (getters.isAppReady) {
          dispatch('refreshMessages');
        }
      };

      setTimeout(call, 4000);
      await call();
    },

    async refreshMessages({commit, state}) {
      commit('startLoading');
      commit('clearError');
      try {
        let messages = await apiGetMessages();
        commit('resetMessages', sortMessages(messages, state.sortType));
      } catch (e) {
        commit('setExtensionError', e);
      } finally {
        commit('stopLoading');
      }
    },

    changeSortBy({commit, state}, sortType) {
      commit('clearError');
      commit('resetMessages', sortMessages(state.messages, sortType));
      commit('setSortType', sortType);
    }
  }
});
