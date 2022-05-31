import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    all: [],
    added: [],
    history: [],
  },
  mutations: {
    //Обновление столбца Добавленные
    updateAdded(state, item) {
      const removeId = state.all.findIndex(row => row.id === item.id);
      if (removeId < 0) {
        return;
      }
      state.all.splice(removeId, 1)
      state.added.push(item);
    },
    //Обновление столбца Все
    updateAll(state, item) {
      const removeId = state.added.findIndex(row => row.id === item.id);
      if (removeId < 0) {
        return;
      }
      state.added.splice(removeId, 1);
      state.all.push(item);
    },
    //Обновление истории
    updateHistory(state, item) {
      state.history.push(item);
    },
    saveData(state, data) {
      state.all = data;
    },
  },
  actions: {
    //Получение данных с сервера
    async getData(ctx) {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        ctx.commit("saveData", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    //Перенос данных в столбец Добавленные
    toAdded(ctx, item) {
      ctx.commit("updateAdded", item);
      const historyItem = {
        item,
        method: 'add',
        data: new Date().toISOString().slice(0, -5),
      };
      ctx.commit("updateHistory", historyItem);
    },
    //Перенос данных в столбец Все
    toAll(ctx, item) {
      ctx.commit("updateAll", item);
      const historyItem = {
        item,
        method: 'remove',
        data: new Date().toISOString().slice(0, -5),
      };
      ctx.commit("updateHistory", historyItem);
    },
  },
  getters: {
    getAdded(state) {
      return state.added;
    },
    getAll(state) {
      return state.all;
    },
    getHistory(state) {
      return state.history;
    },
  }
})
